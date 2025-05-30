const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Toggles welcome message deletion in this channel.')
    .addBooleanOption(option =>
      option.setName('enabled')
        .setDescription('Enable or disable welcome message deletion.')
        .setRequired(true)),
  async execute(interaction) {
    const enabled = interaction.options.getBoolean('enabled');

    if (enabled) {
      // Delete all messages in the channel
      try {
        let fetched;
        do {
          fetched = await interaction.channel.messages.fetch({ limit: 100 });
          await interaction.channel.bulkDelete(fetched);
        } while (fetched.size >= 2);
        await interaction.reply({ content: 'Welcome message deletion enabled and previous messages cleared!', ephemeral: true });
      } catch (error) {
        console.error('Error deleting messages:', error);
        await interaction.reply({ content: 'There was an error deleting messages. Make sure I have the necessary permissions.', ephemeral: true });
        return;
      }
    } else {
      await interaction.reply({ content: 'Welcome message deletion disabled.', ephemeral: true });
    }
  },
};
