const Discord = require("discord.js");

module.exports = {
  name: "pts",
  description: "Shows the amount of points",
  execute(message, args, User) {
    let errorMessage = new Discord.MessageEmbed().setTitle(':x: **Error**').setColor(0xdc2e44).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');

    let username = message.author.username;
    let avatar = message.author.avatarURL();
    let userID = message.author.id;

    if (args[1]) {
      try {
        username = message.mentions.users.first().username;
        avatar = message.mentions.users.first().avatarURL();
        userID = message.mentions.users.first().id;
      }catch{
        return message.channel.send(errorMessage.setDescription('Invalid user.'));
      }
    }

    User.findOne({ id: message.author.id }, function (err, user) {
      if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));

      if (!user) return message.channel.send(errorMessage.setDescription('pts account not found. Make one using /newac'));

      let pointsToGold = user.pts / 100;
      const pointsEmbed = new Discord.MessageEmbed()
        .setTitle(username)
        .setThumbnail(avatar)
        .addField("Points", user.pts)
        .addField("Gold Value", Math.floor(pointsToGold))
        .addField("Date Created", user.dateCreated + ' UTC')
        .setColor(0x2e3192)
        .setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
      message.channel.send(pointsEmbed);
    })
  }
};