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

// Create a new Captcha object - this will contain "PNGStream" and "value".
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
const Captcha = require("@haileybot/captcha-generator"),
	Discord = require("discord.js");

// Use this function for blocking certain commands or features from automated self-bots
function verifyHuman(msg) {
	let captcha = new Captcha();
	msg.channel.send(
		"**Enter the text shown in the image below:**",
		new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")
	);
	let collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id);
	collector.on("collect", m => {
		if (m.content === captcha.value) msg.channel.send("Verified Successfully!");
		else msg.channel.send("Failed Verification!");
		collector.stop();
	})
}

```

## License
This project is licensed under [AGPL-3.0](https://github.com/HaileyBot/captcha-generator/blob/master/LICENSE)
