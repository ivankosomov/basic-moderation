const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        // 
        let kullanıcı = args[0]

        if(!kullanıcı){
            const hoxxhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author} **Lütfen sunucudan banlanan kullanıcı ID'sini gir**`)
            return message.channel.send(hoxxhata)
        }

        if(FK(kullanıcı)){
            const hoxxhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author} **Lütfen sunucudan banlanan kullanıcı ID'sini gir**`)
            return message.channel.send(hoxxhata)
        }

        if(kullanıcı){
            message.guild.fetchBans().then(FKhox => {
                if(!FKhox.has(kullanıcı)){
                    //

                    const banlanmamis = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`Belirtilen ${args[0]} ID'li kullanıcı sunucudan yasaklanmamış.`)
                    message.channel.send(banlanmamis)
                }

                // 

                message.guild.fetchBan(kullanıcı).then(({ user, reason }) => {
                    const banlanmis = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`Belirtilen ${user}(\`${user.id}\`) Kişisi **${reason}** Sebebiyle sunucudan yasaklanmış.`)
                    return message.channel.send(banlanmis)
               })
            })
        }

    } // FK


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Ban-sorgu','bansorgu','ban sorgu'],
    permLevel: 0
}

exports.help = {
    name: 'ban-sorgu'
}
