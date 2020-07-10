const Discord = require("discord.js");

module.exports = {
  name: "newac",
  description: "Creates a new pts account",
  execute(message, User) {
    let successMessage = new Discord.MessageEmbed().setTitle(':white_check_mark: **Success!**').setColor(0x07BF63).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
    let errorMessage = new Discord.MessageEmbed().setTitle(':x: **Error**').setColor(0xdc2e44).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');

    User.findOne({ id: message.author.id }, function (err, user) {
      if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));

      if (user) return message.channel.send(errorMessage.setDescription('You already have a pts account!'));

      let today = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');

      let newUser = new User({
        id: message.author.id,
        username: message.author.username,
        pts: 0,
        dateCreated: today
      });
      newUser.save();

      message.channel.send(successMessage.setDescription('pts account created!'));
    });
  }
};
