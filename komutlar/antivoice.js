exports.run = async (client, message, args) => {
    message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
  const target = message.mentions.members.first();
    if (!target) return message.reply("Lütfen bir kullanıcı seçin!");

    let role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "antivc"
    );
    if (!role) {
      try {
        message.channel.send("Anti Voice rolü oluşturuluyor...");
        role = await message.guild.roles.create({
          data: {
            name: "Anti Voice",
            permissions: [],
          },
        });

        message.guild.channels.cache
          .filter((c) => c.type === "voice")
          .forEach(async (channel) => {
            await channel.createOverwrite(role, {
              VIEW_CHANNEL: true,
              CONNECT: false,
            });
          });

        message.channel.send("Rol oluşturuldu.");
      } catch (error) {
        console.log(error);
      }
    }
    await target.roles.add(role.id);
    message.channel.send(`${target} kullanıcısına "Anti Voice" verildi! Ses odalarına girişi engellendi.`);
}

exports.conf = {
    aliases: ["antivoice", "sesengel"],
    permLevel: 0
}

exports.help = {
    name: 'antivc',
    description: 'Kullanıcıyı ses kanallarından engeller.',
    usage: 'antivc <user>'
}
