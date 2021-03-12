const { DiscordAPIError } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    const role = message.guild.roles.cache.get('765630367201230869');

    if (mentionedMember) {
      if (mentionedMember.roles.cache.has(role.id)) {
        const noEmbed = new Discord.MessageEmbed()
          .setTitle(`Please do not attempt to ping the FOUNDERS.:rage:`)
          .setDescription('Repetation of this behaviour can result in a warn followed by a **Kick/Ban**.')
          .setColor('RED')
          .setTimestamp();
        await message.member.send(noEmbed);
      }
    }

    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}