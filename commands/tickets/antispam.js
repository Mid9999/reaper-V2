 
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anti-spam')
        .setDescription('Toggles anti-spam protection on or off.')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Whether to enable or disable anti-spam.')
                .setRequired(true)),
    async execute(interaction) {
        const enabled = interaction.options.getBoolean('enabled');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Implement anti-spam logic here (e.g., using a database or in-memory store)
        // Store the enabled/disabled state for this guild.

        if (enabled) {
            // Enable anti-spam
            interaction.client.antiSpamEnabled = true; // Example: Store in client
            await interaction.reply({ content: 'Anti-spam protection is now enabled.', ephemeral: true });
        } else {
            // Disable anti-spam
            interaction.client.antiSpamEnabled = false; // Example: Store in client
            await interaction.reply({ content: 'Anti-spam protection is now disabled.', ephemeral: true });
        }
    },
};
