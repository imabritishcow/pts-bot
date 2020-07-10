const Discord = require("discord.js");

module.exports = {
  name: "faqs",
  description: "Frequently asked questions",
  execute(message) {
    const faqEmbed = new Discord.MessageEmbed()
      .setTitle("Frequently Asked Questions")
      .addField("What are the value of my points?", "1G spent = 10 points, 100 points = 1G")
      .addField("What happens if I delete my discord account?", "Your points will be deleted. Ask staff to transfer your points")
      .addField("Can I delete my pts account?", "You will have to ask staff to delete your account. But why would you?")
      .setColor(0x2e3192)
      .setThumbnail('https://cdn.bcow.tk/logos/pts.png')
      .setFooter('pts', 'https://cdn.bcow.tk/logos/pts.png');
    message.channel.send(faqEmbed)
  }
};

