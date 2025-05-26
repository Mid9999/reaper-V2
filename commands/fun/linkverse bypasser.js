const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linkversebypass')
        .setDescription('Bypasses a Linkvertise link and retrieves the destination URL.')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The Linkvertise link to bypass.')
                .setRequired(true)),
    async execute(interaction) {
        const link = interaction.options.getString('link');
        await interaction.deferReply(); // Defer the reply to allow time for processing

        try {
            const response = await axios.get(link, {
                maxRedirects: 0, // Prevent automatic redirects
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // Accept 3xx status codes
                }
            });

            if (response.status === 302) {
                const destinationUrl = response.headers.location;
                await interaction.editReply(`Bypassed Linkvertise link: ${destinationUrl}`);
            } else {
                await interaction.editReply('Could not bypass the Linkvertise link.  It may not be a valid Linkvertise link, or the bypass method failed.');
            }


        } catch (error) {
            console.error('Error bypassing Linkvertise:', error);
            await interaction.editReply('An error occurred while trying to bypass the Linkvertise link.');
        }
    },
};
// dont skid!! this is made by ekittendestoryer and a prive source
