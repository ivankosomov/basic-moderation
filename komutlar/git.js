const { MessageEmbed } = require("discord.js");

const ayarlar = require("../ayarlar.json");
const filter = m => m.content.includes("discord");
module.exports.run = async (client, message, args) => {
  const msg = message;

  let uye =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed()
    .setAuthor(
      message.member.displayName,
      message.author.avatarURL({ dynamic: true })
    )
    .setFooter("❤️ FK ya")
    .setColor("RANDOM")
    .setTimestamp();
  if (!uye)
    return message.channel
      .send(embed.setDescription("Ses odasına gidilecek üyeyi belirtmelisin!"))
      .then(x => x.delete({ timeout: 5000 }));
  if (
    !message.member.voice.channel ||
    !uye.voice.channel ||
    message.member.voice.channelID == uye.voice.channelID
  )
    return message.channel
      .send(
        embed.setDescription(
          "Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!"
        )
      )
      .then(x => x.delete({ timeout: 5000 }));
  const kabul = (reaction, user) => {
    return ["✅"].includes(reaction.emoji.name) && user.id === uye.id;
  };
  const reddet = (reaction, user) => {
    return ["❌"].includes(reaction.emoji.name) && user.id === uye.id;
  };
  message.channel
    .send(`${uye}`, {
      embed: embed
        .setAuthor(
          uye.displayName,
          uye.user.avatarURL({ dynamic: true, size: 2048 })
        )
        .setDescription(
          `${message.author} Senin Ses Kanalına Girmek İçin İzin İstiyor! Onaylıyor Musun?`
        )
    })
    .then(async msj => {
      await msj.react("✅");
      await msj.react("❌");

      msj
        .awaitReactions(reddet, { max: 1, time: 15000, error: ["time"] })
        .then(c => {
          let cevap = c.first();
          if (cevap) {
            msj.delete();
            message.channel.send(`${message.member} isteğin kabul edilmedi.`);
          }
        });

      msj
        .awaitReactions(kabul, { max: 1, time: 15000, error: ["time"] })
        .then(c => {
          let cevap = c.first();
          if (cevap) {
            message.member.voice.setChannel(uye.voice.channelID);
            msj.delete();
          }
        });
    });
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 0
};

module.exports.help = {
  name: "git",
  description: "",
  usage: ""
};
