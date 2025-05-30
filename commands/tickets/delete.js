const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message-autodelete')
        .setDescription('deletes all messages thats not /verify.'),
    async execute(interaction) {
        await interaction.reply({ content: 'Verification channel setup!', ephemeral: true });

        const channel = interaction.channel;

        const filter = m => m.content.startsWith('/') === false; // Messages that DON'T start with a slash
        const collector = channel.createMessageCollector({ filter, time: 86400000 }); // Collect for 24 hours

        collector.on('collect', async m => {
            try {
                await m.delete();
            } catch (error) {
                console.error('Failed to delete message:', error);
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} messages.`);
            interaction.channel.send("Verification channel is no longer active.");

        });
    },
};
