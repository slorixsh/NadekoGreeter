const { MessageEmbed } = require("discord.js");

exports.help = {
  name: "greet",
  aliases: []
};

exports.run = async (client, message, args) => {
  if (!message.guild) return message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail('b')
        .setDescription(':x: You can\'t use this command on Direct Messages!')
      );
  if (!message.member.permissions.has('ADMINISTRATOR')) {
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
        .setDescription(':x: You don\'t have permission to use this command!')
      );
  };
  let arg = args[0];
  if (!arg) {
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
        .setDescription(':x: Please specify a argument: `msg`, `del-time`, `channel`')
      );
  } else {
    if (arg == "msg") {
      let msg = args.slice(1).join(" ");
      if(!msg) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
            .setDescription(':x: Please specify a message for greet!\n\n:star: Variables:\n{member} -> <@'+message.author.id+'>\n{member-tag} -> **'+message.author.tag+'**\n{member-name} -> **'+message.author.username+'**\n{guild-member-count} -> **'+message.guild.memberCount+'**')
        );
      };
      return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
            .setDescription(':white_check_mark: Congratulations, you did set the message for greet!')
        ).then((x) => { client.db.set(`${message.guild.id}.greet-msg`, msg) });
    } else if (arg == "del-time") {
      let time = args[1];
      if(!time) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
            .setDescription(':x: Please specify a time (exp. `1`, this 1 is one second) for greet!')
        );
      };
      return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
            .setDescription(':white_check_mark: Congratulations, you did set the time for greet!')
        ).then((x) => { client.db.set(`${message.guild.id}.greet-time`, time) }); 
    } else if(arg == "channel") {
      let channel = message.mentions.channels.first();
      if(!channel) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024')
            .setDescription(':x: Please specify a channel (exp. `#channel`, this channel is a normal channel from your guild) for greet!')
        );
      };
      return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
            .setColor("BLURPLE")
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/avatars/851372062487871518/0a6ee59b50ce2deaa9355544616efce5.png?size=1024no')
            .setDescription(':white_check_mark: Congratulations, you did set the channel for greet!')
        ).then((x) => { client.db.set(`${message.guild.id}.greet-channel`, channel.id) }); 
    }
  }
};