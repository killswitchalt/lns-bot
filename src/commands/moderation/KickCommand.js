const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Cannot Use This Command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = " No Reason Provided";
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You Were Kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

  // $kick @user
    if (!args[0]) return message.channel.send("You need to state a user to kick. \`$kick @user reason\`")
    if(!mentionedMember) return message.channel.send("The member mentioned is not in the server.")
    try {
      await mentionedMember.kick(reason)
      await mentionedMember.send(kickEmbed);
  }   catch (err) {
      console.log(`i was unable to message the member`)
  }

    try {
      await mentionedMember.kick(reason);
  }   catch (err) {
      console.log(err);
      return message.channel.send("I was unable to kick the member mentioned. :sob:")
    }
  }
}