exports.run = (client, message, args, links, guilds, fortniteAPI, lang, language, prefix, server) => {
  if(message.member.roles.find("name", "Bot")) {
      if (args[0]) { 
          guilds.query(`SELECT * FROM roles WHERE serverID = '${server}' and roleID = '${args[0]}' or rolename = '${args[0]}'`, (err, row) => {
              if (row && row.length) {
                const role = row[0].rolename;
                guilds.query(`DELETE from roles WHERE serverID = '${server}' and roleID = '${args[0]}' or rolename = '${args[0]}'`, (err, row) => {
                  message.channel.send(lang[language].DelSuccess + role);
              });
              }
              else {
                message.channel.send(lang[language].NotRole);
              }
          });
      }
  }
}