const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
//This FK man .dd
exports.run = async (client, message, args) => {
  //This FK man .dd
  if (args[0] === "aç") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "Bu Komutu Kullanmak İçin `Mesajları Yönet` Yetkisine Sahip Omalısınız!"
      );
    //This FK man .dd
    db.set(`${message.guild.id}.kufur`, true);
    //This FK man .dd
    const kinda = new Discord.MessageEmbed()
      //This FK man .dd
      .setDescription(`Küfür Engel Başarılı Bir Şekilde Akif Edildi!`)
      .setColor("GREEN");
    //This FK man .dd
    return message.channel.send(kinda);
  }

  if (args[0] === "kapat") {
    //This FK man .dd
    db.delete(`${message.guild.id}.kufur`);

    const kinda = new Discord.MessageEmbed()
      //This FK man .dd
      .setDescription(`Küfür Engel Başarılı Bir Şekilde Deaktif Edildi!`)
      .setColor("GREEN");

    return message.channel.send(kinda);
  }
  {
    //This FK man .dd
    const kinda = new Discord.MessageEmbed()

      .setDescription(
        "Lütfen **aç** Veya **kapat** Yazın. Örnek Kullanım : **küfür-engel aç/kapat**"
      )
      .setColor("RED");
    //This FK man .dd
    return message.channel.send(kinda);
  }
  //This FK man .dd
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfürengel"],
  permLevel: 0
};
//This FK man .dd
exports.help = {
  name: "küfür-engel",
  description: "Küfür Engel",
  usage: "küfür-engel"
};
