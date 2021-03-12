const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I require \`"MANAGE_CHANNELS"\` permission to execute this command.');


    const value = Number(args[0]);

    if (!args[0]) return message.channel.send('You need to state a number to which u would like to set the slowmode to.');
    if (!value || value < 1 || value > 21600) return message.channel.send('You need to state a number between 1 and 21600, (values are represented in seconds).');
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(`The slowmode for ${message.channel} is set to ${value} seconds .`);
    } catch (err) {
      console.log(err);
      message.channel.send('Something went wrong setting up the slowmode.');
    }
  }
}