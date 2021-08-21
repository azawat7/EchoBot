const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "mod-role",
  aliases: ["modrole"],
  category: "administration",
  expectedArgs: "`<@role/role_id>`",
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_ROLES"],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🎭🔨",
  admin: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  const role = message.mentions.roles.first();
  if (role) {
    if (!settings.roles.modRoles.includes(role.id)) {
      settings.roles.modRoles.push(role.id);
      const roles = settings.roles.modRoles.map((role) => `<@&${role}>`);
      message.channel.sendSuccessMessage(
        r(language.SUCCESS, {
          "{role}": `<@&${role.id}>`,
          "{roles}": roles.join(", "),
        })
      );
    } else {
      settings.roles.modRoles.pull(role.id);
      if (settings.roles.modRoles.length) {
        const roles = settings.roles.modRoles.map((role) => `<@&${role}>`);
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
    if (settings.roles.modRoles.length) {
      const roles = settings.roles.modRoles.map((role) => `<@&${role}>`);
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
