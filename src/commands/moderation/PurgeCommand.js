const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You Cannot Use this Command.');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have \`MANAGE_MESSAGES\` permission.");
    if (!args[0]) return message.channel.send("You must state a number of messages to purge.\`$purge number\`");
    const amonutToDelete = Number(args[0], 10);

    if (isNaN(amonutToDelete)) return message.channel.send("Number Stated is not a valid number.")
    if (!Number.isInteger(amonutToDelete)) return message.channel.send("Number stated Must be a whole Number.");
    if (!amonutToDelete || amonutToDelete < 2 || amonutToDelete > 100) return message.channel.send('The number stated must be between 2 and 100.');
    const fetched = await message.channel.messages.fetch({
      limit: amonutToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`I have Deleted ${messages.size} messages as you requested :grin:`));
    } catch (err) {
      console.log(err);
      message.channel.send(`I was unable to delete the amount stated make sure the messages you want to clear are below 14 days old.`);
    }
  }
}