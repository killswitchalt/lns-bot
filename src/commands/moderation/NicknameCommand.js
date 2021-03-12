const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {


    if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You cannot use this command.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require the \`MANAGE_NICKNAMES\` permission to execute this command.");

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    if (!args[0]) return message.channel.send("You must state the member to change their nickname.");
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (!nickName) return message.channel.send("You must state a nickname for the member.");
    if (!mentionedMember.kickable) return message.channel.send("I cannot change that members nickname as their role is higher than mine.");

    await mentionedMember.setNickname(nickName).catch(err => console.log(err) && message.channel.send("There was an error while executing this command, Make sure the nickname is atmost 32 characters."));
    await message.channel.send(`I have successfully changed ${mentionedMember.user.tag}'s nickname`)

  }
}