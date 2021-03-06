import "reflect-metadata";
import { Intents } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import schedule from 'node-schedule'
import SendIncomingMatchesInAllServers from "./useCases/matches/SendIncomingMatchesInAllServers";

require('dotenv').config()
async function start() {
    await importx(`${__dirname}/interactions/**/*.{ts,js}`);
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING
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
        const rule = new schedule.RecurrenceRule();
        rule.hour = 17;
        rule.minute = 0;
        rule.tz = 'Europe/Paris';
        await client.initApplicationPermissions();
        schedule.scheduleJob(rule, () => { 
            SendIncomingMatchesInAllServers.execute(client);
        })

    });
    
    client.on("interactionCreate", (interaction) => {
        try {
            client.executeInteraction(interaction);
        } catch (e) {
            console.error(e);
        }
    });

    client.on("messageCreate", (message) => {
        client.executeCommand(message);
    });
    
    client.login(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');
}  
start();
