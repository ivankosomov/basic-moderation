exports.run = async (client, message, args) => {
    const target = message.mentions.members.first();
    if (!target) return message.reply("Kullanıcı belirt!");

    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "antivc"
    );
    if (!role) return message.reply("Rol bulunmuyor!");

    if (!target.roles.cache.has(role.id))
      return message.reply(`${target} Anti Voice a sahip değil.`);

    target.roles.remove(role.id);
    message.channel.send(`${target} kullanıcısından Anti Voice kaldırıldı.`);
}

exports.conf = {
    aliases: ["unantivoice", "unav", "unantivc"]
}

exports.help = {
    name: 'un-antivc',
    description: 'Kullanıcının antivcsini kaldırır.',
    usage: '<@user>'
}
