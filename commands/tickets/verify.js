const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies you and gives you the member role.'),
    async execute(interaction) {
        const member = interaction.member;
        const guild = interaction.guild;

        // Replace 'YOUR_ROLE_ID' with the actual ID of the role you want to assign.
        const roleId = '1364219960364105728';

        try {
            const role = await guild.roles.fetch(roleId);

            if (!role) {
                return interaction.reply({ content: 'Verification role not found. Could be wrong server??.', ephemeral: true });
            }

            await member.roles.add(role);
            await interaction.reply({ content: `You have been verified and given the ${role.name} role!`, ephemeral: true });

        } catch (error) {
            console.error('Failed to add role:', error);
            await interaction.reply({ content: 'Failed to verify. Please contact an administrator.', ephemeral: true });
        }
    },
};
