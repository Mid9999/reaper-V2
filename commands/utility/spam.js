import discord
from discord.commands import slash_command, Option
from discord.ext import commands
import asyncio
import aiohttp

class Spam(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @slash_command(name="spam", description="Spam a webhook with a custom message.")
    async def spam(
        self,
        ctx: discord.ApplicationContext,
        webhook_url: Option(str, "The webhook URL to spam."),
        message: Option(str, "The message to send."),
        amount: Option(int, "The amount of messages to send.", default=5)
    ):
        """Spam a webhook with a custom message."""
        await ctx.defer()
        
        async with aiohttp.ClientSession() as session:
            for _ in range(amount):
                data = {"content": message}
                async with session.post(webhook_url, json=data) as response:
                    if response.status >= 400:
                        await ctx.respond(f"Failed to send message. Status code: {response.status}", ephemeral=True)
                        return
                await asyncio.sleep(0.5)  # Add a small delay to avoid rate limits

        await ctx.respond(f"Successfully spammed the webhook {amount} times.", ephemeral=True)


def setup(bot):
    bot.add_cog(Spam(bot))
