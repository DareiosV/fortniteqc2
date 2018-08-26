exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    if(message.member.roles.find("name", "Bot")) {
        if (args[0]) { 
                  guilds.query(`UPDATE config SET prefix = '${args[0]}' WHERE serverID = '${server}'`, (err, row) => {
                        message.channel.send(lang[language].prefixSuccess + args[0]);
                });
                }
        }
  }