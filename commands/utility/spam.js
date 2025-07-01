import discord
from discord.ext import commands

class SpamCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(name="spam", description="Spams a message to a webhook (admin only).")
    @commands.has_permissions(administrator=True)
    async def spam(self, ctx, webhook_id: str, message: str, amount: int):
        """Spams a message to a webhook.

        Args:
            ctx: The context of the command.
            webhook_id: The ID of the webhook to send the message to.
            message: The message to send.
            amount: The amount of messages you want to send
        """
        try:
            webhook = await self.bot.fetch_webhook(int(webhook_id))
        except discord.NotFound:
            await ctx.respond("Invalid Webhook ID.")
            return
        except discord.InvalidArgument:
            await ctx.respond("Invalid Webhook ID.")
            return
        except discord.HTTPException:
            await ctx.respond("Could not fetch webhook.")
            return

        await ctx.respond(f"Spamming {message} {amount} times!", ephemeral=True)
        for _ in range(amount):
            await webhook.send(message)

def setup(bot):
    bot.add_cog(SpamCommand(bot))
