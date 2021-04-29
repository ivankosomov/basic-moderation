const Discord = require("discord.js");
const client = new Discord.Client();
const jimp = require("jimp");
const db = require("quick.db");
const ayarlar = require("./ayarlar.json"); //fk fk
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Projen aktif olarak çalışıyor");
});

app.listen(port, () => {
  console.log(`Proje ${port} portuyla başlatıldı`);
});
//
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});

const log = message => {
  console.log(` ${message}`); //fk fk
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
}); //fk fk
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`); //fk fk
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//fk fk
client.login(ayarlar.token);
//fk fk
//-------------------- Küfür Engel --------------------//
const settings = {
  "kayıtchat": "828778457886228522"
}
client.on("guildMemberAdd", (message, member) => {

  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let hosgeldin = (`:tada::tada: Numb #0470 Krallığına hoş geldin ${member}, seninle beraber **${member.guild.memberCount}** kişiye ulaştık.
   Tagımızı (\`numb\`) isminize ya da etiketinize (\`#0470\`) eklerseniz kayıt odalarına girip kayıt olabilirsiniz. 
  ${member} Hesabın ${member.client.tarihHesapla(member.user.createdAt)} tarihinde açılmış. Hesap ${guvenilirlik ? "Şüpheli!" : "Güvenilir!  "}
  `);
  member.setNickname(`Mercy?`).catch();
  client.channels.cache.get(settings.kayıtchat).send(`${hosgeldin}`); 
});
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "anan",
      "ananı",
      "skem",
      "sikeyim",
      "skm",
      "orospu evladı",
      "orsbu evladı",
      "orosbu evladı",
      "amcık",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } //fk fk
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq",
      "daşşak",
      "oç"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

//snipe

client.on("messageDelete", msg => {
  let asd = JSON.parse(fs.readFileSync("./jsonlar/snipe.json", "utf8"));
  asd[msg.guild.id] = {
    mesaj: msg.content,
    isim: msg.author.username + "#" + msg.author.discriminator
  };

  fs.writeFile("./jsonlar/snipe.json", JSON.stringify(asd), err => {
    //console.log(err)
  });

  asd[msg.guild.id].mesaj = msg.content;
});
//fk fk

client.on("message", message => {
  //
  if (!message.guild) return;
  if (message.content.startsWith(ayarlar.prefix + "afk")) return;

  //
  let hoxafk = message.mentions.users.first();
  let hoxkisi = db.fetch(`kisiid_${message.author.id}_${message.guild.id}`);
  let hoxeskisim = db.fetch(
    `kisiisim_${message.author.id}_${message.guild.id}`
  );

  //
  if (hoxafk) {
    //
    let cmfsebep = db.fetch(`cmfsebep_${hoxafk.id}_${message.guild.id}`);
    let codemarefikisi2 = db.fetch(`kisiid_${hoxafk.id}_${message.guild.id}`);

    if (message.content.includes(codemarefikisi2)) {
      const cmfbilgiafk = new Discord.MessageEmbed()
        .setDescription(
          `${message.author} - Etiketlemiş Olduğun <@!${codemarefikisi2}> Kişisi Şuan **${cmfsebep}** Sebebiyle AFK`
        )
        .setColor("#36393F")
        .setFooter("Erinys - AFK");
      message.channel.send(cmfbilgiafk);
    }
  }

  if (message.author.id === hoxkisi) {
    db.delete(`cmfsebep_${message.author.id}_${message.guild.id}`);
    db.delete(`kisiid_${message.author.id}_${message.guild.id}`);
    db.delete(`kisiisim_${message.author.id}_${message.guild.id}`);

    message.member.setNickname(hoxeskisim);

    const cmfbilgiafk = new Discord.MessageEmbed()
      .setAuthor(
        `Hoşgeldin ${message.author.username}`,
        message.author.avatarURL({ dynamic: true, size: 2048 })
      )
      .setDescription(
        `<@!${hoxkisi}> Başarılı Bir Şekilde **AFK** Modundan Çıkış Yaptın.`
      )
      .setColor("#36393F")
      .setFooter("Erinys - AFK");
    message.channel.send(cmfbilgiafk);
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamun aleykum") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sea") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamün aleyküm") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamün aleykum") {
    await msg.react("🇦");
    await msg.react("🇸");
  }
});

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      ".hub"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK") //fk fk
            .setTitle("Nine Realms Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Nine Realms Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Nine Realms Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Nine Realms Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed() //fk fk
            .setColor("BLACK")
            .setTitle("Nine Realms Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
client.on("message", message => {
  const reklamlist = [
    ".org",
    ".tr",
    ".space",
    ".funy",
    ".fun",
    ".com",
    ".xyz",
    ".glitch-me",
    ".eueo.org",
    "free.biz",
    ".biz",
    ".free",
    ".blogspot-com",
    ".alan",
    ".com.tr",
    ".sexs",
    ".hub",
    ".dance",
    ".in",
    ".net",
    ".shop",
    ".store",
    ".click",
    ".tech",
    ".best",
    ".college",
    ".me",
    ".site",
    ".online",
    ".art",
    ".host",
    ".baby",
    ".website",
    ".blog",
    ".link",
    ".top",
    ".info",
    ".press",
    ".monster",
    ".services"
  ];
  if (reklamlist.some(hox => message.content.includes(hox))) {
    message.delete();

    const REKLAM = new Discord.MessageEmbed()
      .setDescription(`**Reklam yasak! ${message.author}**`)
      .setColor("#36393F");
    message.channel.send(REKLAM);
  }
});
//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = prefix;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    //FK
    message.member = await message.guild.fetchMember(message);
  const prefixlerim = ["!", "."];
  let astpod = false;
  for (const içindeki of prefixlerim) {
    if (!message.content.startsWith(içindeki)) astpod = içindeki;
  }
  if (!astpod) return;
  const args = message.content
    .slice(astpod.length)
    .trim()
    .split(/ +/g); //AL
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//
client.on("message", message => {
  if (message.content === `<@${client.user.id}>`) {
    message.reply(
      `Selam. Beni etiketlemen mutlu etti fakat bu bot sadece Yönetim Ekibi tarafından yönetilebilir. Seni seviyorum :*`
    );
  }
});
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
client.on("message", msg => {
  var dm = client.channels.cache.get("828714589201760316"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username}'s Direct Message`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField("Gönderen ", msg.author.tag)
      .addField("Gönderen ID :", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});

client.on("ready", () => {
  client.channels.cache.get("828765731985686559").join();
});
//fk?fk?
//-------------------- Mod Log Sistemi --------------------//
client.on("channelCreate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp() //fk?
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.MessageEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`codeminglog_${newEmoji.guild.id}`)
  );
  if (!c) return; //fk?

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${
        user.id
      }**\n Sebep: **${entry.reason || "Belirtmedi"}**\n Banlayan: **${
        entry.executor.username
      }#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
//fk?
client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`codeminglog_${message.guild.id}`)
  );
  if (!channel) return;
  //fk?
  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    ) //fk?
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.cache.get(
    db.fetch(`codeminglog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );
  //fk?
  channel.send(embed);
});

client.on("roleCreate", async role => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp() //fk?
    .setColor("Black")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed); //fk?
});

client.on("roleDelete", async role => {
  //fk?
  const channel = role.guild.channels.cache.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("Black") //fk?
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
