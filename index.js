const discord = require("discord.js");
const { readdirSync } = require("fs");
const chalk = require("chalk");
const client = new discord.Client();
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.db = require("croxydb");

client.on('ready', () => {
  console.log('Bot Ready'); ///console log here
  client.user.setStatus('Online'); ///dnd,idle,online,offline
});

client.on('message', msg => {
    if(msg.author.bot) return;
    let prefix = "?";

    let cmd = msg.content.slice(prefix.length).split(" ")[0];
    let args = msg.content.slice(prefix.length + cmd.length).trim().split(/ +/g);

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(!command) {
        cmd = cmd + " " + args[0];
        args = args.slice(1);
        command = client.commands.get(cmd);
        if(!command) command = client.commands.get(client.aliases.get(cmd));
    }
    if(command) command.run(client, msg, args);
});

    let loaded = 0;
    let errors = 0;
    readdirSync("./cmds").forEach(dir => {
        const files = readdirSync(`./cmds/${dir}`);
        for (let file of files) {
            const pull = require(`./cmds/${dir}/${file}`);
            if(pull.help.name) {
                client.commands.set(pull.help.name, pull);
                if(pull.help.aliases && Array.isArray(pull.help.aliases)) pull.help.aliases.forEach(alias => client.aliases.set(alias, pull.help.name));
                loaded++
            } else {
                errors++
            };
        };
    });
    console.log(
        chalk.green(`[+] ${loaded} Commands Loaded.`)
    );
    if(errors > 0) console.log(
        chalk.red(`[!] We Have ${errors} Problems.`)
    );

client.on('guildMemberAdd', member => {
  let channel = client.db.fetch(`${member.guild.id}.greet-channel`);
  let message = client.db.fetch(`${member.guild.id}.greet-msg`);
  let time = client.db.fetch(`${member.guild.id}.greet-time`);
  if(channel) {
    if (message) {
      if (time) {
        let qwe = message
        .replace('{member}', member)
        .replace('{member}', member)
        .replace('{member}', member)
        .replace('{member}', member)
        .replace('{member-tag}', member.user.tag)
        .replace('{member-tag}', member.user.tag)
        .replace('{member-tag}', member.user.tag)
        .replace('{member-tag}', member.user.tag)
        .replace('{member-name}', member.user.username)
        .replace('{member-name}', member.user.username)
        .replace('{member-name}', member.user.username)
        .replace('{member-name}', member.user.username)
        .replace('{guild-member-count}', member.guild.memberCount)
        .replace('{guild-member-count}', member.guild.memberCount)
        .replace('{guild-member-count}', member.guild.memberCount)
        .replace('{guild-member-count}', member.guild.memberCount)
        client.channels.cache.get(channel).send(qwe).then((x) => { x.delete({timeout:time*1000}) });
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  } 
});

client.on('message', async message => {
if (message.content === '?fk') {
  client.emit('guildMemberAdd', message.member || await message.guild.members.fetch(message.author));
    }
});

client.login('token');