const Discord = require("discord.js");
const fn = require('../util/fn');

module.exports = {
  name: "leaderboard",
  description: "Shows all users ranked by amount of points",
  execute(message, User) {
    let errorMessage = new Discord.MessageEmbed().setTitle(':x: **Error**').setColor(0xdc2e44).setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');

    User.find({}).sort({ pts: 'asc' }).exec(async function (err, users) {
      if (err) return message.channel.send(errorMessage.setDescription('An error occurred.'));
    
      let userList = [];
      let key = 0;
      users.forEach(user => {
        key++
        userList.push(`${key}. ${user.username} - Points: ${user.pts}`);
      })
    
      let pages = userList.map(() => userList.splice(0, 10)).filter(a => a);
      let embeds = [];
    
      let pageNum = 0;
      pages.forEach(page => {
        pageNum++
        let list = page.toString().replace(/,/g, '\n');
        let embed = new Discord.MessageEmbed()
          .setTitle('Leaderboard')
          .setDescription(`\`\`\`${list}\`\`\``)
          .setColor(0x2e3192)
          .setFooter(`Page ${pageNum}/${pages.length} | pts`, 'https://cdn.bcow.tk/logos/pts.png');
        embeds.push(embed);
      })
    
      message.channel.send(embeds[0]).then((m) => {
        fn.paginator(message.author.id, m, embeds, 0);
      });
      message.channel.stopTyping();
    })
  }
};