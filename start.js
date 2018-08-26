const Discord = require("discord.js");
const mysql = require('mysql');
const client = new Discord.Client();
const config = require("./config/config.json");
const cities = require("./config/cities.json");
const Fortnite = require("fortnite-api");
const lang = require("./config/lang.json");
const fs = require("fs");

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

const guilds = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "guilds"
});

const links = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "links"
});

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
    guilds.query(`SELECT * FROM config WHERE serverID = ${server}`, (err, row) => {
        if (row[0].stats === "0") {
            guilds.query(`SELECT * FROM config WHERE serverID = ${server}`, (err, row) => {
                const language = row[0].lang;
                guilds.query(`SELECT * FROM config WHERE serverID = ${server}`, (err, row) => {
                    const prefix = row[0].prefix;
                    const args = message.content.slice(prefix.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase();
                    if (message.content.indexOf(prefix) !== 0) return;
                    try {
                        let commandFile = require(`./commands/${command}.js`);
                        commandFile.run(client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server);
                    } catch (err) {
                        message.channel.send(lang[language].error);
                    }
                });
            });
        } else {
            if (message.channel.id === row[0].stats) {
                guilds.query(`SELECT * FROM config WHERE serverID = ${server}`, (err, row) => {
                    const language = row[0].lang;
                    guilds.query(`SELECT * FROM config WHERE serverID = ${server}`, (err, row) => {
                        const prefix = row[0].prefix;
                        const args = message.content.slice(prefix.length).trim().split(/ +/g);
                        const command = args.shift().toLowerCase();
                        if (message.content.indexOf(prefix) !== 0) return;
                        try {
                            let commandFile = require(`./commands/${command}.js`);
                            commandFile.run(client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server);
                        } catch (err) {
                            message.channel.send(lang[language].error);
                        }
                    });
                });
            } else {}
        }
    });
});

client.login(config.token);