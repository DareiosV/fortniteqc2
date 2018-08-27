exports.run = (client, message, args, guilds, fortniteAPI, lang, language, prefix, server) => {
    const username = args.join(" ");
    const query = {
        text: 'SELECT * FROM users WHERE userID = $1',
        values: [message.author.id]
      };
    guilds.query(query, (err, row) => {
        if (row && row.length) {
            message.channel.send(lang[language].alreadyLink + row[0].username + "!");
        } else {
            const query = {
                text: 'SELECT * FROM users WHERE username = $1',
                values: [username]
              };
            guilds.query(query, (err, row) => {
                if (err) throw err;
                if (row && row.length) {
                    message.channel.send(username + " " + lang[language].userExists)
                } else {
                    fortniteAPI.login().then(() => {
                        fortniteAPI
                            .checkPlayer(username, "pc")
                            .then(stats => {
                                const query = {
                                    text: 'INSERT INTO users (userID, username) VALUES ($1, $2)',
                                    values: [message.author.id, username]
                                  };
                                guilds.query(query, (err, row) => {
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