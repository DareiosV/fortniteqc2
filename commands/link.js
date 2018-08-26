exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    const username = args.join(" ");
    links.query(`SELECT * FROM users WHERE userID = ${message.author.id}`, (err, row) => {
        if (row && row.length) {
            message.channel.send(lang[language].alreadyLink + row[0].username + "!");
        } else {
            links.query(`SELECT * FROM users WHERE username = '${username}'`, (err, row) => {
                if (err) throw err;
                if (row && row.length) {
                    message.channel.send(username + " " + lang[language].userExists)
                } else {
                    fortniteAPI.login().then(() => {
                        fortniteAPI
                            .checkPlayer(username, "pc")
                            .then(stats => {
                                links.query(`INSERT INTO users (userID, username) VALUES ('${message.author.id}', '${username}')`, (err, row) => {
                                    if (err) throw err;
                                    message.channel.send(lang[language].linkSuccess + username + "!");
                                });
                            })
                            .catch(err => {
                                message.channel.send(lang[language].NotFound);
                            });
                    });
                }
            });
        }
    });
}