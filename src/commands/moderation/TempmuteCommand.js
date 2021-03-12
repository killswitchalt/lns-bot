const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`"MANAGE_ROLES"\` permission to execute this command.');

    const muteRole = message.guild.roles.cache.get('802161310497898546');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}.`)
      .addField(`Duration: ${time}`,`Reason: $reason`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('You must state a member to tempmute with a time duration. \`$tempmute @member time reason\`');
    if (!mentionedMember) return message.channel.send(' That user is not in the server.')
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`You cannot tempmute a user who has the same role/higher role than u.`);
    if (!time) return message.channel.send('You must state a duration of time. \`$tempmute @member time reason\`');

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));
    await message.channel.send('The user has been muted.').catch(err => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionedMember.send(`Your mute has expired in ${message.guild.name}.`).catch(err => console.log(err));
      await message.channel.send(`${mentionedMember.user} has been unmuted`)
    }, ms(time));
  }
}