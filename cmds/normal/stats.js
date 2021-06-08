const { MessageEmbed } = require('discord.js');

exports.help = {
  name: "stats",
  aliases: []
};

exports.run = async (client, message, args) => {
  let server = client.guilds.cache.array().length;
  let channel = client.channels.cache.array().length;
  let user = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
  let hyprexbtw = new MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
  .setColor("BLURPLE")
  .setTimestamp()
  .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
  .addField("Guilds Count", server, true)
  .addField("Users Count", user, true)
  .addField("Channels Count", channel, true)
  message.channel.send(hyprexbtw);
};