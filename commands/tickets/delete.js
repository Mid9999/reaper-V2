const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('antispeak')
        .setDescription('cant speak.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Requires Manage Channels permission

    async execute(interaction) {
        const channel = interaction.channel;

        // Initial response to the user
        await interaction.reply({ content: 'This channel is now a verification channel. All user messages will be deleted.', ephemeral: true });

        // Function to delete user messages
        const deleteUserMessages = async (message) => {
            if (message.author.id !== interaction.client.user.id) {
                try {
                    await message.delete();
                    console.log(`Deleted message from ${message.author.tag} in ${channel.name}`);
                } catch (error) {
                    console.error('Error deleting message:', error);
                }
            }
        };

        // Listen for new messages in the channel
        interaction.client.on('messageCreate', async (message) => {
            if (message.channel.id === channel.id) {
                await deleteUserMessages(message);
            }
        });
    },
};
