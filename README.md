<h1 align="center">
  Echo one of the best Discord Bot
  <br>
</h1>

<h3 align=center>A customizable bot built with a lot of features and it's not the end!</h3>

<div align="center">

 <a href="https://github.com/mongodb/mongo">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&amp;style=for-the-badge&amp;logo=mongodb&amp;logoColor=white" alt="mongo" />
  </a>
  
  <a href="https://github.com/discordjs">
    <img src="https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm" alt="discordjs" />
  </a>

  <a href="https://github.com/im-a-panda-guy/EchoBot/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache%202-blue" alt="license" />
  </a>
 </div>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#license">License</a>
  •
  <a href="#credits">Credits</a>
</p>

## About

Echo is a Discord Bot that is being developped with a ton of features.

If you liked this repository, feel free to leave a star ⭐ and follow me, it actually means a lot.

## Features

- **admin:** Configure server settings
- **utility:** Some utility commands
- **fun:** A ton of commands to keep your server active
- **information:** Information Commands
- **moderation:** Moderation commands to moderate your discord server

## Installation

1. First clone [this repository](https://github.com/im-a-panda-guy/EchoBot) `git clone https://github.com/im-a-panda-guy/Echo-Bot.git`
2. Run `npm install` in your terminal to install all dependencies
3. Fill the `config.js` with your informations (some info are refering to a .env file, continue reading).
4. Rename the `.env.sample` file to `.env` (DON'T SHARE THIS FILE TO ANYONE)
5. In the `.env` file file set the values that are required (✅) and if you want optionals value (❌) refering to this board :
   | `.env` varriable | Description | Required |
   |---|---|---|
   | TOKEN | The bot token`*` | ✅ |
   | MONGOPATH | Your MongoDB URI`*` | ✅ |
   | WEBHOOKID | Your Discord webhook ID`*` | ✅ |
   | WEBHOOKURL | Your Discord webhook URL`*` | ✅ |
   | PORT | The port that you want to use for the dashboard`**` | ✅/❌ |

   > - `*` = Required to run the bot !
   > - `**` = Required to run the dashboard !

6. You can change the emojis that the bot will use in `assets/emojis.json`.
7. You can change the colors that the bot will use in `assets/colors.json`.
8. Lastly run the bot using `node main.js`

## License

Released under the [Apache-2.0 License](http://www.apache.org/licenses/LICENSE-2.0)

## Credits

- **im-a-panda-guy** - _head developer_ - [github](https://github.com/im-a-panda-guy)

`Template for README taken from https://github.com/peterhanania/Pogy`
