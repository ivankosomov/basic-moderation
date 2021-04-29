const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu komutu kullanabilmek için belirtilen yetkiye sahip değilsin!");
if(!args[0]) return message.channel.send("**Lütfen silinecek mesaj miktarını yazın.!**");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(` ${args[0]} Adet Mesajı Sildim.`).then(a => a.delete(200));
})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sil', 'delete', 'kaldır', 'clear'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
