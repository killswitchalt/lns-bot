const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    const role = message.guild.roles.cache.get('779080978332647474');

    if (mentionedMember) {
      if (mentionedMember.roles.cache.has(role.id)) {
        const hiEmbed = new Discord.MessageEmbed()
          .setTitle(`Please do not attempt to ping the Directors.:rage:`)
          .setDescription('Repetation of this behaviour can result in a warn followed by a **Kick/Ban**.')
          .setColor('RED')
          .setTimestamp();
        await message.member.send(hiEmbed);
      }
    }
  }
}