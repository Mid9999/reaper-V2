const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Made by Ekittendestoryer.'),
	async execute(interaction) {
		const roleId = '1364219960364105728'; // Replace with the actual role ID
		const roleName = '🌠'; // Replace with the role Name
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('add_role')
					.setLabel(`${roleName}`)
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({
			content: 'Click the button below to verify!',
			components: [row],
		});

		const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'add_role') {
				const member = i.member;

				try {
					await member.roles.add(roleId);
					await i.reply({ content: `Successfully added the ${roleName} role!`, ephemeral: true });
				} catch (error) {
					console.error('Failed to add role:', error);
					await i.reply({ content: 'Failed to add the role. Please contact an administrator.', ephemeral: true });
				}
			}
		});

		collector.on('end', collected => {
			if (collected.size === 0) {
				interaction.editReply({ content: 'The button is no longer active.', components: [] });
			}
		});
	},
};
