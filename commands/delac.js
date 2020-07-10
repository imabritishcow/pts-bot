const Discord = require("discord.js");
const config = require('../config.json')

module.exports = {
    name: "delac",
    description: "Deletes an account",
    execute(message, User) {
      let successMessage = new Discord.MessageEmbed().setTitle(':white_check_mark: **Success!**').setColor(0x07BF63).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
      let errorMessage = new Discord.MessageEmbed().setTitle(':x: **Error**').setColor(0xdc2e44).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');

      if (!config.BOT_ADMINS.includes(message.author.id)) return message.channel.send(':x: **Error** You do not have permission to run this command');
      if (!message.mentions.users.first()) return message.channel.send(errorMessage.setDescription("Command usage: /delac [user]"));

      User.findOne({ id: message.author.id }, function(err, user) {
        if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));

        if(!user) return message.channel.send(errorMessage.setDescription(`pts account not found. Use /newac to make one`));

        User.findOneAndDelete({ id: message.author.id }, function(err) {
          if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));

          message.channel.send(successMessage.setDescription('pts account deleted'));
        })
      })
    }
};