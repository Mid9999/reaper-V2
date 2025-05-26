const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const crypto = require('crypto');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-user and pass')
        .setDescription('Generates a random username and password.'),
    async execute(interaction) {
        const username = crypto.randomBytes(8).toString('hex');
        const password = crypto.randomBytes(16).toString('hex');

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Generated user and pass')
            .addFields(
                { name: 'Username', value: username },
                { name: 'Password', value: password },
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
