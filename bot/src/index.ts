import "reflect-metadata";
import { IntentsBitField as Intents  } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";
import schedule from 'node-schedule'
import SendIncomingMatchesInAllServers from "./useCases/matches/SendIncomingMatchesInAllServers";
import SendStatisticsOfCurrentMatches from "./useCases/statistics/SendStatisticsOfCurrentMatches";

require('dotenv').config()
async function start() {
    await importx(`${__dirname}/interactions/**/*.{ts,js}`);
    const client = new Client({
        intents: [
            Intents.Flags.Guilds,
            Intents.Flags.GuildMessages,
            Intents.Flags.GuildMembers,
            Intents.Flags.GuildMessageReactions,
            Intents.Flags.GuildPresences,
            Intents.Flags.DirectMessages,
            Intents.Flags.DirectMessageReactions,
            Intents.Flags.GuildVoiceStates,
            Intents.Flags.GuildScheduledEvents,
            Intents.Flags.DirectMessageTyping
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
        rule.hour = 9;
        rule.minute = 45;
        rule.tz = 'Europe/Paris';
        schedule.scheduleJob(rule, () => { 
            SendIncomingMatchesInAllServers.execute(client);
        })

        const statsRule = new schedule.RecurrenceRule();
        statsRule.minute = 1;
        rule.tz = 'Europe/Paris';

        schedule.scheduleJob(statsRule, () =>{
            SendStatisticsOfCurrentMatches.execute(client);
        })

    });
    
    client.on("interactionCreate", (interaction) => {
        try {
            if (interaction.isCommand()) {
                console.log("defering reply")
                interaction.deferReply().then(() => client.executeInteraction(interaction));
            } else {
                client.executeInteraction(interaction)
            }
        } catch (e) {
            console.log(e);
        }
    });

    client.on("messageCreate", (message) => {
        client.executeCommand(message);
    });
    
    client.login(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');
}  
start();
