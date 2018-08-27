
const Discord = require("discord.js");
const { Pool } = require('pg');
const client = new Discord.Client();
const config = require("./config/config.json");
const Fortnite = require("fortnite-api");
const lang = require("./config/lang.json");
const fs = require("fs");

const guilds = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  guilds.connect(err => {
    if(err) throw err; 
    console.log('Connected to PostgresSQL');
  })

const fortniteAPI = new Fortnite(
    [
        config.email,
        config.password,
        config.ticket1,
        config.ticket2
    ], {
        debug: true
    }
);

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`https://discord.gg/gngGCG`);
});

client.on("guildCreate", guild => {
    guilds.query(`INSERT INTO guilds (lang, prefix, serverID, stats) values ('FR', '!', '${guild.id}', '0')`, (err, row) => {});
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`https://discord.gg/gngGCG`);
});

client.on("guildDelete", guild => {
    guilds.query(`DELETE from config, roles WHERE serverID = ${guild.id}`, (err, row) => {});
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`https://discord.gg/gngGCG`);
});


client.on("message", async message => {
    if (message.author.bot) return;
    const server = message.guild.id;
    const query = {
        text: 'SELECT * from config where serverID = $1',
        values: [server]
      };
    guilds.query(query, (err, row) => {
        if (row.rows[0].stats === "0") {
            guilds.query(query, (err, row) => {
                const language = row.rows[0].lang;
                guilds.query(query, (err, row) => {
                    const prefix = row.rows[0].prefix
                    const args = message.content.slice(prefix.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase();
                    if (message.content.indexOf(prefix) !== 0) return;
                    try {
                        let commandFile = require(`./commands/${command}.js`);
                        commandFile.run(client, message, args, guilds, fortniteAPI, lang, language, prefix, server);
                    } catch (err) {
                        if (err) throw error;
                        message.channel.send(lang[language].error);
                    }
                });
            });
        } else {
            if (message.channel.id === row.rows[0].stats) {
                guilds.query(query, (err, row) => {
                    const language = row.rows[0].lang
                    guilds.query(query, (err, row) => {
                        const prefix = row.rows[0].prefix
                        const args = message.content.slice(prefix.length).trim().split(/ +/g);
                        const command = args.shift().toLowerCase();
                        if (message.content.indexOf(prefix) !== 0) return;
                        try {
                            let commandFile = require(`./commands/${command}.js`);
                            commandFile.run(client, message, args, guilds, fortniteAPI, lang, language, prefix, server);
                        } catch (err) {
                            if (err) throw err;
                            message.channel.send(lang[language].error);
                        }
                    });
                });
            } else {}
        }
    });
});

client.login(config.token);