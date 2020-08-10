[![License](https://img.shields.io/github/license/HaileyBot/captcha-generator?color=d32)](https://github.com/HaileyBot/captcha-generator/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@haileybot/captcha-generator.svg?maxAge=3600&color=d52)](https://www.npmjs.com/package/@haileybot/captcha-generator)
[![NPM downloads](https://img.shields.io/npm/dt/@haileybot/captcha-generator.svg?maxAge=3600&color=db0)](https://www.npmjs.com/package/@haileybot/captcha-generator)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator?ref=badge_shield)
[![Dependencies](https://img.shields.io/david/HaileyBot/captcha-generator.svg?maxAge=3600&color=2c1)](https://david-dm.org/HaileyBot/captcha-generator)
[![PayPal](https://img.shields.io/badge/donate-paypal-13e)](https://donate.haileybot.com)
[![Portfolio](https://img.shields.io/badge/-view%20portfolio-blueviolet)](https://cheesits456.dev)

# Captcha Generator

Captcha Generator is a Node library for quickly and easily generating captcha images that can be used through an authorized bot to verify human users on a chat platform such as Slack or Discord.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Captcha Generator

```bash
npm i @haileybot/captcha-generator
```

## Usage

### Basic:

```js
// Import the module
const Captcha = require("@haileybot/captcha-generator");

// Create a new Captcha object - this will contain "PNGStream" and "value"
//   - "PNGStream" is a stream of the image in PNG format
//   - "value" is the 6 character code the image contains
let captcha = new Captcha();
```

### Save to file example:

```js
const Captcha = require("@haileybot/captcha-generator"),
  fs = require("fs"),
  path = require("path");

let captcha = new Captcha();
captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.png`)));

```

### Discord Example:
This example assumes you already have the core framework of a Discord Bot set up

```js
const Captcha = require("@haileybot/captcha-generator");

// Use this function for blocking certain commands or features from automated self-bots
function verifyHuman(msg) {
  let captcha = new Captcha();
  msg.channel.send(
    "**Enter the text shown in the image below:**",
    new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")
  );
  let collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id);
  collector.on("collect", m => {
    if (m.content.toUpperCase() === captcha.value) msg.channel.send("Verified Successfully!");
    else msg.channel.send("Failed Verification!");
    collector.stop();
  })
}

```

## License
This project is licensed under [AGPL-3.0](https://github.com/HaileyBot/captcha-generator/blob/master/LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator?ref=badge_large)
