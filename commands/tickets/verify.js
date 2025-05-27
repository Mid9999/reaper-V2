const { SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify-setup')
        .setDescription('Sets up a verification system in the specified channel.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set up the verification system in.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to display in the verification channel.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('button-label')
            .setDescription('The label for the verification button.')
            .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message') || 'Click the button below to verify!';
        const buttonLabel = interaction.options.getString('button-label') || 'Verify';

        if (!channel) {
            return interaction.reply({ content: 'Invalid channel provided.', ephemeral: true });
        }

        const verifyButton = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel(buttonLabel)
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(verifyButton);

        try {
            await channel.send({ content: message, components: [row] });
            await interaction.reply({ content: `Verification system set up in ${channel}.`, ephemeral: true });
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'There was an error setting up the verification system.', ephemeral: true });
        }
    },
};
