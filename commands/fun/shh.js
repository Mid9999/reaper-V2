const { SlashCommandBuilder } = require('discord.js');
const { getIP } = require('./ip_lookup'); // Assuming you have an ip_lookup.js file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getip')
        .setDescription('Gets the IP address of a Discord user (Bot maker only)')
        .addUserOption(option => option.setName('target').setDescription('The user to get the IP for').setRequired(true)),
    async execute(interaction) {
        const allowedUserId = '1356445926553554974'; // Replace with your Discord User ID
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const target = interaction.options.getUser('target');

        try {
            const ipAddress = await getIP(target.id); // Assuming getIP function returns the IP or an error message
            await interaction.reply({ content: `IP address of ${target.username}: ${ipAddress}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Failed to retrieve IP address for ${target.username}. Reason: ${error.message || 'Unknown error.'}`, ephemeral: true });
        }
    },
};
