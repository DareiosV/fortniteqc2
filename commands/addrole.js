exports.run = (client, message, args, guilds, fortniteAPI, lang, language, prefix, server) => {
    if(message.member.roles.find("name", "Bot")) {
        if (!isNaN(parseInt(args[0])) && !isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) { 
            if (args[0] && args[1] && args[2] && args[3]) {
                const query = {
                    text: 'SELECT * FROM roles WHERE serverID = $1 and roleID = $2 ORDER by KD ASC',
                    values: [server, args[0]]
                  };
            guilds.query(query, (err, row) => {
                if (row && row.length) {
                    message.channel.send(lang[language].RoleExists);
                }
                else {
                    const query = {
                        text: 'INSERT into roles (roleID, rolename, KD, KDmax, serverID) values ($1, $2, $3, $4, $5)',
                        values: [args[0], args[1], args[2], args[3], server]
                      };
                    guilds.query(query, (err, row) => {
                        message.channel.send(lang[language].RoleSuccess + args[1]);
                    });
                }
            });
        }
        else {
            message.channel.send(prefix + 'addrole {roleid} {rolename} {kd min} {kd max}');
        }
    }
        else {
            message.channel.send(prefix + 'addrole {roleid} {rolename} {kd min} {kd max}');
        }
    }
}