const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Permissions } = require('discord.js');

// Replace with your bot's token and client ID
const token = 'MTM0MjAwMjYyODkyMTY1OTQ1NQ.Gst8-I.DoPASPQ6YRS2wDqocN8yWqi8-_RjGcRi1npHyQ';
const clientId = '1342002628921659455';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const commands = [
    new SlashCommandBuilder()
        .setName('react-role')
        .setDescription('Sets up a reaction role.')
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('The ID of the message to react to.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to use for the reaction.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to give when the reaction is clicked.')
                .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
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

    const { commandName } = interaction;

    if (commandName === 'reactrole') {
        const messageId = interaction.options.getString('message_id');
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');

        try {
            const message = await interaction.channel.messages.fetch(messageId);
            await message.react(emoji);

            // Store the messageId, emoji, and roleId somewhere (e.g., a database or a JSON file)
            // For simplicity, we'll just log them to the console here.
            console.log(`Reaction role set up: messageId=${messageId}, emoji=${emoji}, roleId=${role.id}`);

            await interaction.reply({ content: 'Reaction role set up!', ephemeral: true });
        } catch (error) {
            console.error('Failed to set up reaction role:', error);
            await interaction.reply({ content: 'Failed to set up reaction role.  Make sure the message ID and emoji are correct, and that the bot has permission to react to the message.', ephemeral: true });
        }
    }
});


client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

    // Load the stored reaction role data (messageId, emoji, roleId) from your database or JSON file.
    // For simplicity, we'll assume it's stored in a simple object:
    const reactionRoles = [
        { messageId: 'YOUR_MESSAGE_ID', emoji: 'YOUR_EMOJI', roleId: 'YOUR_ROLE_ID' }, // Replace with actual values
    ];

    const foundReactionRole = reactionRoles.find(rr => rr.messageId === reaction.message.id && rr.emoji === reaction.emoji.name); // Use name, not identifier or other properties
    if (foundReactionRole) {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(foundReactionRole.roleId);

        if (role && member) {
            try {
                await member.roles.add(role);
                console.log(`Added role ${role.name} to ${user.tag}`);
            } catch (error) {
                console.error('Failed to add role:', error);
            }
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

     // Load the stored reaction role data (messageId, emoji, roleId) from your database or JSON file.
    // For simplicity, we'll assume it's stored in a simple object:
    const reactionRoles = [
        { messageId: 'YOUR_MESSAGE_ID', emoji: 'YOUR_EMOJI', roleId: 'YOUR_ROLE_ID' }, // Replace with actual values
    ];

    const foundReactionRole = reactionRoles.find(rr => rr.messageId === reaction.message.id && rr.emoji === reaction.emoji.name);
    if (foundReactionRole) {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(foundReactionRole.roleId);

        if (role && member) {
            try {
                await member.roles.remove(role);
                console.log(`Removed role ${role.name} from ${user.tag}`);
            } catch (error) {
                console.error('Failed to remove role:', error);
            }
        }
    }
});


client.login(token);
