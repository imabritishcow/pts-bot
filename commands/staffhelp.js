const Discord = require('discord.js');

module.exports = {
  name: "staffhelp",
  description: "Help for staff",
  execute(message) {
    if (!config.BOT_ADMINS.includes(message.author.id)) return message.channel.send('You do not have permission to run this command');

    const staffHelpEmbed = new Discord.MessageEmbed()
      .setTitle("Commands - Staff")
      .setColor(0x2e3192)
      .setThumbnail('https://cdn.bcow.tk/logos/pts.png')
      .addField(
        "/setpts [user] [amount]",
        "Sets the amount of points for a user"
      )
      .addField(
        "/addpts [user] [amount]",
        "Adds the specified amount of points to a user"
      )
      .addField(
        "/delac [user]",
        "Deletes the account of a specified user"
      )
      .setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
    message.channel.send(staffHelpEmbed);
  }
};