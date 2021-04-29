const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client; //FK?
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message); //FK?
  let cmd;
  if (client.commands.has(command)) {
    //FK?
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (cmd.conf.enabled === false) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.sahip.includes(message.author.id)
      ) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Gerekli yetkiye sahip değilsin.`
          )
          .setColor("BLACK"); //FK?
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Gerekli yetkiye sahip değilsin.`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Gerekli yetkiye sahip değilsin.`
          )
          .setColor("BLACK"); //FK?
        message.channel.send({ embed });
        return;
      }
    }
   if (cmd.conf.permLevel === 9) {
      if (!message.member.hasPermission("MUTE_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Gerekli yetkiye sahip değilsin.`
          )
          .setColor("BLACK"); //FK?
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Gerekli yetkiye sahip değilsin.`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Gerekli yetkiye sahip değilsin.`)
          .setColor("BLACK");
        message.channel.send({ embed });
        return; //FK?
      }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
