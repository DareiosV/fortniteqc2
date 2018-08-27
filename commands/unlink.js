exports.run = (client, message, args, guilds, fortniteAPI, lang, language, prefix, server) => {
    guilds.query(`SELECT * FROM users WHERE userID = ${message.author.id}`, (err, row) => {
        if (row && row.length) {
            const user = row[0].username;
            guilds.query(`DELETE from users WHERE userID = ${message.author.id}`, (err, row) => {
                message.channel.send(user + " " + lang[language].deleteSuccess);
            });
        } else {
            message.channel.send(lang[language].deleteError + prefix + "link pseudo");
        }
    });
}