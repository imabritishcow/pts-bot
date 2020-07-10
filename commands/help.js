const Discord = require('discord.js');

module.exports = {
  name: "help",
  description: "Help command",
  execute(message) {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .addField("/help", "Shows this")
      .addField("/faqs", "Shows frequently asked questions")
      .addField("/newac", "Creates a new card linked to your discord account")
      .addField("/pts [user]", "Shows your card info")
      .setColor(0x2e3192)
      .setThumbnail('https://cdn.bcow.tk/logos/pts.png')
      .setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
    message.channel.send(helpEmbed);
  }
};
