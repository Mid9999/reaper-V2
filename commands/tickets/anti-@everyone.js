const { SlashCommandBuilder } = require('discord.js');

let verifyEnabled = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anti-@everyone')
        .setDescription('Toggles the verify system on or off.')
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('Whether the verify system should be enabled.')
                .setRequired(true)),
    async execute(interaction) {
        const enabled = interaction.options.getBoolean('enabled');

        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        verifyEnabled = enabled;

        await interaction.reply({ content: `anti-@everyone system is now ${verifyEnabled ? 'enabled' : 'disabled'}.`, ephemeral: true });
    },
    async handleMessage(message) {
        if (verifyEnabled && message.content.includes('@everyone') && !message.member.permissions.has('ADMINISTRATOR')) {
            await message.delete();
            await message.channel.send({ content: `${message.author}, you are not allowed to use @everyone only admins are!.`, ephemeral: true });
        }
    },
};
