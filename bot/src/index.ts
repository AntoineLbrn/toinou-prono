import "reflect-metadata";
import { Intents } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
require('dotenv').config()
async function start() {
    await importx(`${__dirname}/interactions/**/*.{ts,js}`);
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
          ],
        silent: false,
        botGuilds: process.env.DEV ? ["606422928518545409"] : undefined,
    });
    
    client.on("ready", async () => {
        console.log(">> Bot started");
        await client.clearApplicationCommands();
        await client.clearApplicationCommands("606422928518545409");
        await client.initApplicationCommands({
            global: { log: true },
            guild: { log: true },
          });
        await client.initApplicationPermissions();
    });
    
    client.on("interactionCreate", (interaction) => {
        client.executeInteraction(interaction);
    });


    client.on("messageCreate", (message) => {
        client.executeCommand(message);
    });
    
    client.login(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');
}  
start();
