exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    guilds.query(`SELECT * FROM roles WHERE serverID = '${server}' ORDER by KD ASC`, (err, row) => {
        const newRank = row.map(rank => `**${rank.rolename}:** ${rank.KD}+`).join('\n');
        message.channel.send({embed: {
            color: 3447003,
            description: `${newRank}`,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: `Roles`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Uɳιx#3142"
            }
          }
        });
    });
}