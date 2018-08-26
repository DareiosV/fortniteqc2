exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    links.query(`SELECT * FROM users WHERE userID = ${message.author.id}`, (err, row) => {
        if (row && row.length) {
            const username = row[0].username;
            guilds.query(`SELECT * FROM roles WHERE serverID = '${server}' ORDER by KD ASC`, (err, row) => {
                if (row && row.length) {  
                    fortniteAPI.login().then(() => {
                    fortniteAPI
                    .getStatsBR(username, "xb1", "alltime")
                        .then(stats => {
                            if (stats.lifetimeStats["k/d"] > row[0].KD) {
                                const ranks = row.map(rank => `${rank.roleID}`);
                                let removeRank = null;               
                            row.forEach(function(rows) {

                                if (stats.lifetimeStats["k/d"] >  rows.KD && stats.lifetimeStats["k/d"] < rows.KDmax) {
                                    if (message.member.roles.has(rows.roleID)) {
                                        message.channel.send(lang[language].alreadyRole + rows.rolename + lang[language].KD + stats.lifetimeStats["k/d"]);
                                        removeRank = rows.roleID;
                                    }
                                    else {
                                        message.channel.send(lang[language].giveRole + rows.rolename + lang[language].KD + stats.lifetimeStats["k/d"]);
                                        message.member.addRole(rows.roleID);
                                        removeRank = rows.roleID;
                                    }    
                                }
                            });
                            const removedRank = ranks.indexOf(removeRank);
                            ranks.splice(removedRank, 1);
                            ranks.forEach(function(row) {
                                message.member.removeRole(row);
                        });
                        } else {
                            message.channel.send(lang[language].NotEnoughXB1 + lang[language].KD + stats.lifetimeStats["k/d"]);
                            const newRank = row.map(rank => `${rank.rolename} = ${rank.KD}+`).join('\n');
                            message.channel.send(
                                newRank
                            );
                        }
                        })
                        .catch(err => {
                            if (err) throw err;
                            message.channel.send(lang[language].NotFound);
                        });
                    });
                }
                else {
                    message.channel.send(lang[language].NoRole);
                }   
            });
        } else {
            message.channel.send(lang[language].deleteError + prefix + "link pseudo")
        }
    });
}