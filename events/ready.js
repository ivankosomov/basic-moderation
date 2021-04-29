const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var oyun = [
         "ssh!",
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "FK YA" );
        }, 2 * 15000);
  
  console.log(` `);
  console.log(` `);
  console.log(` `);
  console.log(`+-----------------------------------------------------+`);
  console.log(`|              Komutlar Aktif !                 |`);
  client.user.setStatus("listening");
};
