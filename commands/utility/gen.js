const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { generateRobloxAccount, sendTextMessage } = require('../utils/robloxUtils'); // Assuming you have a utility file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Creates a random Roblox account.'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); // Defer reply as account creation and texting might take time

        try {
            const account = await generateRobloxAccount();

            if (!account) {
                await interaction.editReply('Failed to generate Roblox account. Please try again later.');
                return;
            }

            const { username, password } = account;

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Roblox Account Created!')
                .addFields(
                    { name: 'Username', value: username },
                    { name: 'Password', value: password },
                )
                .setTimestamp();

            // Attempt to DM the user
            try {
                await interaction.user.send({ embeds: [embed] });
                await interaction.editReply('A Roblox account has been created and the details have been sent to your DMs!');
            } catch (error) {
                console.error('Could not send DM to user:', error);
                await interaction.editReply('A Roblox account has been created, but I could not DM you the details. Please make sure your DMs are open.');
                return; // Stop execution as DM failed.
            }

            // Removed text message functionality due to ethical concerns and lack of context for proper implementation.

        } catch (error) {
            console.error('Error creating Roblox account:', error);
            await interaction.editReply('An error occurred while creating the Roblox account. Please try again later.');
        }
    },
};
