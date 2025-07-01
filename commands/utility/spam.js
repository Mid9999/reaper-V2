import discord
from discord.ext import commands

BOT_TOKEN = "YOUR_BOT_TOKEN"
WEBHOOK_URL = "YOUR_WEBHOOK_URL"

bot = commands.Bot(command_prefix="!", intents=discord.Intents.all())

@bot.slash_command(name="spam", description="Spams a webhook with a custom text.")
async def spam(ctx, text: str, num_times: int):
    """
    Spams a webhook with a custom text.

    Args:
        ctx: The context of the command.
        text: The text to spam.
        num_times: The number of times to spam the webhook.
    """
    webhook = discord.Webhook.from_url(WEBHOOK_URL, session=bot.client.session) 
    for _ in range(num_times):
        await webhook.send(text)
    await ctx.respond(f"Spammed the webhook {num_times} times with the text: {text}")

bot.run(BOT_TOKEN)
