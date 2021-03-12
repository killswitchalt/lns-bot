const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity("Join: https://discord.gg/WQPjuTdr3A || Made by Killswitch#0001")
  }
}