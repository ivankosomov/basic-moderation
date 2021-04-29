const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      ":no_entry: Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmanız gerek."
    );
  if (!args[0]) {
    return message.channel.send(`**Bir ID girmelisin!**`);
  }
  var sebep = args.slice(1).join(" ");
  var hoxx = args[0];
  var now = new Date();
  if (!sebep) {
    message.guild.fetchBans().then(bans => {
      if (bans.has(hoxx)) {
        return message.channel.send(`❌ Bu Kullanıcı Zaten Yasaklanmış.`);
      }
      message.guildsebep
        .ban(hoxx, sebep)
        .then(async member => {
          let user;
          if (member instanceof Discord.GuildMember) {
            user = member.user;
          } else if (member instanceof Discord.User) {
            user = member;
          } else {
            user = await client.fetchUser(member);
          }
          message.channel.send(`<@!${user.id}> adlı kullanıcı banlandı ❌`);
        })
        .catch(error => {
          message.channel.send(`❌ Bir Hata Oluştu`);
          console.error(":x: Hata:", error);
        });
    });
  } else {
    message.guild.fetchBans().then(bans => {
      if (bans.has(hoxx)) {
        return message.channel.send(`Bu Kullanıcı Zaten Yasaklanmış.`);
      }
      message.guild
        .ban(hoxx, sebep)
        .then(async member => {
          let user;
          if (member instanceof Discord.GuildMember) {
            user = member.user;
          } else if (member instanceof Discord.User) {
            user = member;
          } else {
            user = await client.fetchUser(member);
          }
          message.channel.send(`<@!${user.id}> sunucudan yasaklandı :ban:`);
        })
        .catch(error => {
          message.channel.send(` Bir Hata Oluştu`);
          console.error(" Hata:", error);
        });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["forceban", "yargi"],
  permLevel: 0
};

exports.help = {
  name: "yargı",
  description: "Oylama yapmanızı sağlar.",
  usage: " <id>"
};
