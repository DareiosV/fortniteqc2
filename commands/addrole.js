exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
    if(message.member.roles.find("name", "Bot")) {
        if (!isNaN(parseInt(args[0])) && !isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) { 
            if (args[0] && args[1] && args[2] && args[3]) {
            guilds.query(`SELECT * FROM roles WHERE serverID = '${server}' and roleID = '${args[0]}' ORDER by KD ASC`, (err, row) => {
                if (row && row.length) {
                    message.channel.send(lang[language].RoleExists);
                }
                else {
                    guilds.query(`INSERT into roles (roleID, rolename, KD, KDmax, serverID) values ('${args[0]}', '${args[1]}', '${args[2]}', '${args[3]}', '${server}')`, (err, row) => {
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