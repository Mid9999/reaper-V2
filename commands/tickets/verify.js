const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Creates a verification button.'),
	async execute(interaction) {
		const verifyButton = new ButtonBuilder()
			.setCustomId('verify_button')
			.setLabel('Verify')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(verifyButton);

		await interaction.reply({ content: 'Click the button to verify!', components: [row] });

		const collector = interaction.channel.createMessageComponentCollector({ time: 3600000 });

		collector.on('collect', async i => {
			if (i.customId === 'verify_button') {
				const role = interaction.guild.roles.cache.find(role => role.name === 'Verified'); // Replace 'Verified' with your role name
				if (!role) {
					return await i.reply({ content: 'Verification role not found.  Please contact an administrator.', ephemeral: true });
				}

				try {
					await i.member.roles.add(role);
					await i.reply({ content: 'You have been verified!', ephemeral: true });
				} catch (error) {
					console.error('Failed to add role:', error);
					await i.reply({ content: 'Failed to add role. Please contact an administrator.', ephemeral: true });
				}
			}
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} interactions.`));
	},
};
