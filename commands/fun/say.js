client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    const sayMessage = args.join(' ');
    msg.delete().catch(err => console.log(err));
    msg.channel.send(sayMessage);
  }
});
