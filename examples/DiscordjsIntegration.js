// Use this function for blocking certain commands or features from automated self-bots
function verifyHuman(msg) {
  const Captcha = require("@haileybot/captcha-generator");
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
