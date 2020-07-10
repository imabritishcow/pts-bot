const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
  name: 'setpts',
  description: 'Sets the amount of points',
  execute(message, args, User) {
    let successMessage = new Discord.MessageEmbed().setTitle(':white_check_mark: **Success!**').setColor(0x07BF63).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
    let errorMessage = new Discord.MessageEmbed().setTitle(':x: **Error**').setColor(0xdc2e44).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');

    if (!config.BOT_ADMINS.includes(message.author.id)) return message.channel.send('You do not have permission to run this command');
    if (!message.mentions.users.first()) return message.channel.send(errorMessage.setDescription('Command usage: /addpts [user] [amount]'));
    if (!args[2]) return message.channel.send(':x: **Error** Command usage: /addpoints [user] [amount]');
    if (!isFinite(args[2])) return message.channel.send(errorMessage.setDescription('Command usage: /addpts [user] [number] <- Needs to be a number'));

    User.findOne({ id: message.mentions.users.first().id }, function(err, user) {
      if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));

      if (!user) return message.channel.send(errorMessage.setDescription('pts account not found. Make one using /newac'));

      user.pts = args[2]*1;
      user.save();

      message.channel.send(successMessage.setDescription(`Points set to ${args[2]} for \`${message.mentions.users.first().username}\``));
    })
  }
}