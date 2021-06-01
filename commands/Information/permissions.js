const { Permissions } = require("discord.js");
const permissions = Object.keys(Permissions.FLAGS);

module.exports.help = {
  name: "permissions",
  aliases: ["permission", "perms"],
  category: "information",
  expectedArgs: "`<@user>`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: [],
  clientPerms: ["SEND_MESSAGES"],
  nsfw: false,
  cooldown: 3,
};

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() || message.member;
  let text = `\`\`\`${member.user.username}\'s permissions in ${message.channel.name} :\n\n`;
  const mPermissions = message.channel.permissionsFor(member);
  const total = {
    denied: 0,
    allowed: 0,
  };
  permissions.forEach((perm) => {
    if (!mPermissions.has(perm)) {
      text += `${perm} ❌\n`;
      total.denied++;
    } else {
      text += `${perm} ✅\n`;
      total.allowed++;
    }
  });
  text += `\n${total.allowed} ✅ | ${total.denied} ❌` + "\n```";
  message.channel.send(text);
};
