const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Creates a ticket button.'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Open Ticket')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: 'Click the button below to open a ticket!', components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ time: 3600000 }); // Collect for 1 hour

        collector.on('collect', async i => {
            if (i.customId === 'create_ticket') {
                await i.deferReply({ ephemeral: true }); // Acknowledge the interaction

                const channelName = `ticket-${i.user.username}`;

                // Check if a ticket channel already exists for the user
                const existingChannel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
                if (existingChannel) {
                    return i.editReply({ content: `You already have an open ticket at <#${existingChannel.id}>.`, ephemeral: true });
                }


                interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.Text,
                    parent: interaction.channel.parentId, // Keep the ticket in the same category as the command
                    permissionOverwrites: [
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        // Add permissions for staff roles here, if needed
                    ],
                }).then(channel => {

                    const closeButtonRow = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('close_ticket')
                                .setLabel('Close Ticket')
                                .setStyle(ButtonStyle.Danger),
                        );

                    channel.send({ content: `${i.user}, welcome to your ticket! Please describe your issue.`, components: [closeButtonRow] });
                    i.editReply({ content: `Ticket created at <#${channel.id}>.`, ephemeral: true });

                    const closeCollector = channel.createMessageComponentCollector({ time: 3600000 });

                    closeCollector.on('collect', async j => {
                        if (j.customId === 'close_ticket') {
                            await j.deferReply({ ephemeral: true });
                            channel.delete();
                            j.editReply({ content: 'Ticket closed.', ephemeral: true });
                        }
                    });

                    closeCollector.on('end', collected => {
                        console.log(`Collected ${collected.size} interactions for close ticket.`);
                    });



                }).catch(console.error);
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions for open ticket.`);
        });
    },
};
