const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "admin-role",
  aliases: ["adminrole"],
  category: "admin",
  expectedArgs: "`<@role/role_id>`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_ROLES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🎭👑",
  admin: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const role = message.mentions.roles.first();
  if (role) {
    if (!settings.roles.adminRoles.includes(role.id)) {
      settings.roles.adminRoles.push(role.id);
      const roles = settings.roles.adminRoles.map((role) => `<@&${role}>`);
      message.channel.sendSuccessMessage(
        r(language.SUCCESS, {
          "{role}": `<@&${role.id}>`,
          "{roles}": roles.join(", "),
        })
      );
    } else {
      settings.roles.adminRoles.pull(role.id);
      if (settings.roles.adminRoles.length) {
        const roles = settings.roles.adminRoles.map((role) => `<@&${role}>`);
        message.channel.sendSuccessMessage(
          r(language.SUCCESS2, {
            "{role}": `<@&${role.id}>`,
            "{roles}": roles.join(", "),
          })
        );
      } else {
        message.channel.sendSuccessMessage(
          r(language.SUCCESS3, {
            "{role}": `<@&${role.id}>`,
          })
        );
      }
    }
    await settings.save().catch(() => {});
  } else {
    if (settings.roles.adminRoles.length) {
      const roles = settings.roles.adminRoles.map((role) => `<@&${role}>`);
      message.channel.sendSuccessMessage(
        `${language.EMBED1}\n🎭 ${r(language.EMBED3, {
          "{roles}": roles.join(", "),
        })}`
      );
    } else {
      message.channel.sendSuccessMessage(
        `${language.EMBED1}\n🎭 ${language.EMBED2}`
      );
    }
  }
};
