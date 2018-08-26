exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    links.query(`SELECT * FROM users WHERE userID = ${message.author.id}`, (err, row) => {
        if (row && row.length) {
            const user = row[0].username;
            links.query(`DELETE from users WHERE userID = ${message.author.id}`, (err, row) => {
                message.channel.send(user + " " + lang[language].deleteSuccess);
            });
        } else {
            message.channel.send(lang[language].deleteError + prefix + "link pseudo")
        }
    });
}