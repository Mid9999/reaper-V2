const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const moment = require('moment');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Displays information about the bot.'),

  async execute(interaction) {
    const { client } = interaction;
    const totalGuilds = client.guilds.cache.size;
    const totalMembers = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    const uptime = moment.duration(client.uptime).humanize();

    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    );
    const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
    const cpuUsage = os.loadavg()[0].toFixed(2);
    const cpuModel = os.cpus()[0].model;
    const operatingSystem = `${os.type()} ${os.release()}`;

    const botInfoEmbed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(`${client.user.username} - Bot Information`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: 'check',
          value: '```elm\n
            
  ________  ________  _________        ________  ________   ___       ___  ________   _______      
|\   __  \|\   __  \|\___   ___\     |\   __  \|\   ___  \|\  \     |\  \|\   ___  \|\  ___ \     
\ \  \|\ /\ \  \|\  \|___ \  \_|     \ \  \|\  \ \  \\ \  \ \  \    \ \  \ \  \\ \  \ \   __/|    
 \ \   __  \ \  \\\  \   \ \  \       \ \  \\\  \ \  \\ \  \ \  \    \ \  \ \  \\ \  \ \  \_|/__  
  \ \  \|\  \ \  \\\  \   \ \  \       \ \  \\\  \ \  \\ \  \ \  \____\ \  \ \  \\ \  \ \  \_|\ \ 
   \ \_______\ \_______\   \ \__\       \ \_______\ \__\\ \__\ \_______\ \__\ \__\\ \__\ \_______\
    \|_______|\|_______|    \|__|        \|_______|\|__| \|__|\|_______|\|__|\|__| \|__|\|_______|
  \n```',
          inline: true,
