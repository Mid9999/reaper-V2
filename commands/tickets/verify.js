const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-verification')
        .setDescription('Sets up a verification system in a specified channel.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the verification message to.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to give to verified members.')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const verifyButton = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(verifyButton);

        try {
            await channel.send({ content: 'Click the button below to verify yourself!', components: [row] });
            await interaction.reply({ content: `Verification system setup in ${channel} with role ${role}.`, ephemeral: true });
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'There was an error setting up the verification system. Please check the bot\'s permissions in the specified channel.', ephemeral: true });
        }
    },
};
