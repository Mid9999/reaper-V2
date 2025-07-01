import discord
from discord.ext import commands

# Replace 'MTM0MjAwMjYyODkyMTY1OTQ1NQ.GoaSKc.g0EQQj3RemvNFRfHb4Q6buh-khiz6paSDzncrc' with your actual bot token
BOT_TOKEN = 'YOUR_BOT_TOKEN'

# Replace with your desired prefix
BOT_PREFIX = '!'

bot = commands.Bot(command_prefix=BOT_PREFIX, intents=discord.Intents.all())

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')
    print('------')

@bot.command(name='skipverse')
async def skipverse(ctx, *, link: str):
    """
    Skips the Linkvertise link and sends the direct link.
    """
    await ctx.send(f"Here is the direct link: {link}")

bot.run(BOT_TOKEN)
