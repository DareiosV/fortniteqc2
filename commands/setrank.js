exports.run = (client, message, args, guilds, fortniteAPI, lang, language, prefix, server) => {
    const query = {
        text: 'SELECT * FROM users WHERE userID = $1',
        values: [message.author.id]
      };
    guilds.query(query, (err, row) => {
        if (err) throw err;
        if (row.rows && row.rows.length) {
            const username = row.rows[0].username;
            const query = {
                text: 'SELECT * FROM roles WHERE serverID = $1 ORDER by KD ASC',
                values: [server]
              };
            guilds.query(query, (err, row) => {
                if (err) throw err;
                if (row.rows && row.rows.length) {  
                    fortniteAPI.login().then(() => {
                    fortniteAPI
                    .getStatsBR(username, "pc", "alltime")
                        .then(stats => {
                            if (stats.lifetimeStats["k/d"] > row.rows[0].KD) {
                                const ranks = row.map(rank => `${rank[0].roleID}`);
                                let removeRank = null;               
                            row.forEach(function(rowe) {

                                if (stats.lifetimeStats["k/d"] >  rowe.rows[0].KD && stats.lifetimeStats["k/d"] < rowe.rows[0].KDmax) {
                                    if (message.member.roles.has(rowe.rows[0].roleID)) {
                                        message.channel.send(lang[language].alreadyRole + rowe.rows[0].rolename + lang[language].KD + stats.lifetimeStats["k/d"]);
                                        removeRank = rowe.rows[0].roleID;
                                    }
                                    else {
                                        message.channel.send(lang[language].giveRole + rowe.rows[0].rolename + lang[language].KD + stats.lifetimeStats["k/d"]);
                                        message.member.addRole(rowe.rows[0].roleID);
                                        removeRank = rowe.roles[0].roleID;
                                    }    
                                }
                            });
                            const removedRank = ranks.indexOf(removeRank);
                            ranks.splice(removedRank, 1);
                            ranks.forEach(function(row) {
                                message.member.removeRole(row);
                        });
                        } else {
                            message.channel.send(lang[language].NotEnough + lang[language].KD + stats.lifetimeStats["k/d"]);
                            const newRank = row.map(rank => `${rank[0].rolename} = ${rank[0].KD}+`).join('\n');
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
                    if (err) throw err;
                    message.channel.send(lang[language].NoRole);
                }   
            });
        } else {
            if (err) throw err;
            message.channel.send(lang[language].deleteError + prefix + "link pseudo")
        }
    });
}