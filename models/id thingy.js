const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: './ip_lookup',
    description: 'Looks up information about an IP address.',
    usage: '<ip address>',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You need to provide an IP address to lookup!');
        }

        const ipAddress = args[0];

        try {
            const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
            const data = await response.json();

            if (data.status === 'fail') {
                return message.channel.send(`Error: ${data.message}`);
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`IP Lookup for ${ipAddress}`)
                .addFields(
                    { name: 'Country', value: data.country },
                    { name: 'Region', value: data.regionName },
                    { name: 'City', value: data.city },
                    { name: 'Latitude', value: data.lat },
                    { name: 'Longitude', value: data.lon },
                    { name: 'ISP', value: data.isp },
                    { name: 'Organization', value: data.org },
                    { name: 'AS', value: data.as }
                )
                .setTimestamp();

            message.channel.send( { embeds: [embed] });

        } catch (error) {
            console.error(error);
            return message.channel.send('An error occurred while looking up the IP address.');
        }
    },
};
