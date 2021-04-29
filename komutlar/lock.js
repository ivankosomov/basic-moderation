const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.permissions.has("MOVE_MEMBERS")) return;

  let channel = message.mentions.channels.first() || message.channel;

  let reason;
  if (!message.mentions.channels.first()) {
    if (args[0]) reason = args.slice(0).join(" ");
  }
  if (message.mentions.channels.first()) {
    if (args[1]) reason = args.slice(1).join(" ");
  }
  //This is FK!
  let reasonn;
  if (!reason) reasonn = "Sebep Girilmemiş.";
  if (reason) reasonn = `${reason}.`;
  message.channel
    .send(`Kanal ${channel} kilitlendi.`)
    .then(m => m.delete({ timeout: 7000 }));

  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  channel.updateOverwrite(
    everyone,
    { SEND_MESSAGES: false },
    "Kilitleyen " + message.author.tag
  );
  channel.send(
    new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(channel.name + " kilitlendi.")
      .setDescription(`\nKilitlenme Sebebi: ${reasonn}`)
  );
  //This is FK!
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kilit", "kanalkilit", "kanal-kilit"],
  permLevel: 0
};

exports.help = {
  name: "lock"
};
