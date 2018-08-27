exports.run = (client, message, args, guilds, fortniteAPI, lang, language, prefix, server) => {
    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `${lang[language].Title}`,
        fields: [{
            name: `${prefix}link {user}`,
            value: `${lang[language].Link}`
          },
          {
            name: `${prefix}unlink`,
            value: `${lang[language].Unlink}`
          },
          {
            name: `${prefix}setrank`,
            value: `${lang[language].Setrank}`
          },
          {
            name: `${prefix}setrank_xb1`,
            value: `${lang[language].Setrank} (xbox)`
          },
          {
            name: `${prefix}setrank_ps4`,
            value: `${lang[language].Setrank} (playstation)`
          },
          {
            name: `${prefix}list`,
            value: `${lang[language].Liste}`
          },
          {
            name: `${prefix}help`,
            value: `${lang[language].Help}`
          },
          {
            name: `**Special**`,
            value: `*${lang[language].botRole}*`
          },
          {
            name: `${prefix}prefix {prefix}`,
            value: `${lang[language].prefix}`
          },
          {
            name: `${prefix}addrole {roleid} {rolename} {kd min} {kd max}`,
            value: `${lang[language].addRole}`
          },
          {
            name: `${prefix}delrole {roleid} ou {rolename}`,
            value: `${lang[language].delRole}`
          }
      ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Uɳιx#3142"
        }
      }
    });
}