<h1 align="center">Captcha Generator</h1>
<p align="center">
	<a href="https://www.npmjs.com/package/@haileybot/captcha-generator" title="NPM version"><img alt="NPM version" src="https://img.shields.io/npm/v/@haileybot/captcha-generator?logo=npm"/></a>
	<a href="https://www.npmjs.com/package/@haileybot/captcha-generator" title="NPM downloads"><img alt="NPM downloads" src="https://img.shields.io/npm/dt/@haileybot/captcha-generator?logo=npm"/></a>
	<a href="https://david-dm.org/HaileyBot/captcha-generator" title="Dependencies"><img alt="Dependencies" src="https://img.shields.io/david/HaileyBot/captcha-generator?logo=npm"/></a>
	<br>
	<a href="https://github.com/HaileyBot/captcha-generator/blob/master/LICENSE" title="License"><img alt="License" src="https://img.shields.io/github/license/HaileyBot/captcha-generator?logo=github&logoColor=black"/></a>
	<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator?ref=badge_shield" title="FOSSA Status"><img alt="FOSSA Status" src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator.svg?type=shield"/></a>
	<a href="https://codecov.io/gh/HaileyBot/captcha-generator" title="Code Coverage"><img alt="Code Coverage" src="https://codecov.io/gh/HaileyBot/captcha-generator/branch/master/graph/badge.svg?token=OW7Q7Y1B2A"/></a>
	<br>
	<a href="https://github.com/sponsors/cheesits456" title="GitHub Sponsors"><img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/cheesits456?color=EA4AAA&logo=github-sponsors"/></a>
	<a href="https://donate.haileybot.com" title="PayPal"><img alt="PayPal" src="https://img.shields.io/badge/donate-paypal-13e?logo=paypal"/></a>
</p>

Captcha Generator is a Node library for quickly and easily generating captcha images that can be used through an authorized bot to verify human users on a chat platform such as Slack or Discord.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Captcha Generator

```bash
npm i @haileybot/captcha-generator
```

## Usage

### Basic

```js
// Import the module
const Captcha = require("@haileybot/captcha-generator");

// Create a new Captcha object
//  - Optional argument to specify image height (250 to 400px, default 250)
//    - Image width is 400px
//  - Returned object will contain 4 properties
//    - "PNGStream" is a stream object for the image file in PNG format
//    - "JPEGStream" is a stream object for the image file in JPEG format
//    - "dataURL" is a data URL containing the JPEG image data
//    - "value" is the 6 character code the image contains
let captcha = new Captcha();
console.log(captcha.value);
```

### Save to file example

```js
const path = require("path"),
	fs = require("fs"),
	Captcha = require("@haileybot/captcha-generator");

let captcha = new Captcha();
captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.png`)));
captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.jpeg`)));
```

### Discord Example

This example assumes you already have the core framework of a Discord Bot set up

```js
const Captcha = require("@haileybot/captcha-generator");

// Use this function for blocking certain commands or features from automated self-bots
function verifyHuman(msg) {
	let captcha = new Captcha();
	msg.channel.send(
		"**Enter the text shown in the image below:**",
		new Discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")
	);
	let collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id);
	collector.on("collect", m => {
		if (m.content.toUpperCase() === captcha.value) msg.channel.send("Verified Successfully!");
		else msg.channel.send("Failed Verification!");
		collector.stop();
	});
}
```

## License

This project is licensed under [GPL-3.0](https://github.com/HaileyBot/captcha-generator/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHaileyBot%2Fcaptcha-generator?ref=badge_large)
