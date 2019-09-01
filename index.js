const Rcon = require('rcon');
const Dotenv = require('dotenv');
Dotenv.config();

const { HOST, PORT, PASSWORD } = process.env;
const botName = 'ChfuSzcz';


const convertTextToTellRaw = (text) => {
  const textSetup = [{
    text: `[${botName}] `,
    color: 'gold'
  },
  {
    text: `${text}`,
    color: 'blue'
  }];
  if(text === "Discord") {
    const hyperlink = {
      underlined: true,
      clickEvent: {
        action: "open_url",
        value: "https://discord.gg/xrsJZTR"
      }
    };
    textSetup[1] = Object.assign(textSetup[1], hyperlink);
  }
  if (text === 'Zapraszamy na strone serwera!') {
    const hyperlink = {
      underlined: true,
      clickEvent: {
        action: "open_url",
        value: "https://snoh666.github.io/react-mc-user-panel/#/"
      }
    }
    textSetup[1] = Object.assign(textSetup[1], hyperlink);
  }
  console.log(JSON.stringify(textSetup));
  return `tellraw @a [${JSON.stringify(textSetup)}]`;
};


const botMessages = [`Zapraszamy na strone serwera!`,
  'list',
  "Zakaz griefowania, trollowania oraz oszukiwania!",
  "Discord",
  "Prosze o wplaty na amortyzator dla @czestozmieniamnicki",
  "Prosze o zaplate za serwer i wejsciowke do snoh666 (2,5 zł)"];


const options = {
  tcp: true,
  challenge: false
};
const conn= new Rcon(HOST, PORT, PASSWORD, options);



const sayInfo = () => {
  conn.on('auth', function () {
    console.log("Authed!");
  })
    .on('response', value => {
      console.log('Response' + value);
      if(value.includes('There are')) {
        let players = value.split(':')[1];
        conn.send(convertTextToTellRaw(`Gracze online: ${players.split(',').length}`));
      }
    })
    .on('end', () => {
      console.log('End');
      process.exit()
    });

  conn.connect();

    setTimeout(() => {
      conn.send(convertTextToTellRaw('Server bot is starting..'));
      setInterval(() => {
        let pick = Math.floor(Math.random() * botMessages.length);

        conn.send(pick !== 1 ? convertTextToTellRaw(botMessages[pick]) : 'list');
      }, 150000)
    }, 1000);

}

sayInfo();