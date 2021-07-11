const { MessageEmbed, MessageAttachment } = require("discord.js");
const { Guild } = require("../../models/index");
const Captcha = require("@haileybot/captcha-generator");
// const { createSimpleSlider } = require("discord-epagination");

module.exports.help = {
  name: "test",
  aliases: [],
  category: "utility",
  expectedArgs: "`<id>`",
  minArgs: 0,
  maxArgs: null,
  ownerOnly: true,
  userPerms: [],
  clientPerms: [],
  nsfw: false,
  cooldown: 3,
  example: 1,
  // hidden: true,
};

module.exports.run = async (client, message, args, language, settings) => {
  message.delete();

  if (args[0] === "role") {
    const embed0 = new MessageEmbed()
      .setColor("#2f3136")
      .setImage(
        "https://cdn.discordapp.com/attachments/848607249748459550/862287858136121374/Thank_8.png"
      );

    const embed1 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `__**Staff Roles**__\n\n<@&862101629545480212> - Me and my bots ;)\n\n<@&862104040283963422> - Administrators of the server.\n\n<@&862104050986909698> - Senior Moderators.\n\n<@&862104786516836392> - Moderators.\n\n<@&862103894771630100> - Staff Members.`
      );
    const embed2 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `__**Special Roles**__\n\n<@&862117914568425472> - Read the role name ;)\n\n<@&862110491320254494> - The first **10** member of the server (doesn't include my friends).\n・*Custom reaction/sticker at their name.*\n・*More advantages in the footer ⬇*\n\n<@&862109982798381056> - The first **50** members of the server.\n・*Advantages in the footer ⬇*\n\n<@&801805417742991391> - Members who boost **iagp's** server.\n・*Advantages in the footer ⬇*`
      )
      .setFooter(
        "Footer :\n- Unlocks the use of external emojis.\n- Sending ads in 👓・self-promo and 💠・exlusive-promo.\n- Posting images everywhere.\n- Changing nickname."
      );
    const embed3 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `__**Level Roles**__\n\n<@&862125798910853120> - 83255fsdh32hbfskl342bhfdsjk432kbafsdk4523bkj1famn423kb1fdmn3wej433\n・*558b1ceb1e40ce5b8d4f83e7b0ff76caba1c78cb1dc7b654849586bea7ea49c7*\n\n<@&862125797815746602> - Yeah, pratically normal...\n\n<@&862126762107469855> - God Fan ⭕\n\n<@&862126643114672149> - A no-life, but not fully.\n・Posting in <#862388328044560415>\n\n<@&862126544636739584> - Phenomenal people.\n・*Custom reaction/sticker at your name.*\n\n<@&862125797695684618> - Legendary Grade Fans 🟨\n・*Unlock the ability of posting images anywhere.*\n\n<@&862125797132468226> - Epic Grade Fans 🟪\n\n<@&862125795878502430> - Rare Grade Fans 🟦\n・*Posting in <#862141677064945714>.*\n\n<@&862125794708160533> - Advanced Grade Fans 🟩\n・*Changing nickname.*\n\n<@&862125103800909875> - Basic Grade Fans ⬜\n・*Unlocks the use of external emojis.*\n・*Sending images in <#862137694628872202>.*`
      );
    const embed4 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `__**Other Roles**__\n\n<@&862294461400219660> - Role with permissions to use music bots.\n\n<@&862298411512496128> - Muted role.`
      );

    const embed5 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        "Any other ideas for advantages ? DM `iapg` or one of the admins."
      );

    message.channel.send(embed0);
    message.channel.send(embed1);
    message.channel.send(embed2);
    message.channel.send(embed3);
    message.channel.send(embed4);
    message.channel.send(embed5);
  } else if (args[0] === "about") {
    const embed0 = new MessageEmbed()
      .setColor("#2f3136")
      .setImage(
        "https://cdn.discordapp.com/attachments/862319855805267978/862319884075401216/wl_image.png"
      );

    const embed1 = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `Heyo new member of **iapg's** server. This server is his official community server.\n**iapg's channel :** [here](https://www.youtube.com/channel/UCuRP1XWyeb_o15_N_hMR_Rg)`
      );

    const embed2 = new MessageEmbed()
      .setColor("#2f3136")
      .setImage(
        "https://cdn.discordapp.com/attachments/862319855805267978/862321676851216384/rules_image.png"
      );
    const embed3 = new MessageEmbed().setColor("#2f3136").setDescription(
      `**\`\`\`A. Guidelines & Basic Thingy\`\`\`**
        > ${client.emoji.check} **By joining the server you accept discord guidelines and TOS (https://discord.com/terms & https://discord.com/guidelines).**
        > 
        > ${client.emoji.check} **Be respectful to everyone.**
        > 
        > ${client.emoji.check} **Have patience when asking for help & stay on topic where required .**
        > 
        > ${client.emoji.check} **Be mindful of swearing, only use it moderately.**
        > 
        > ${client.emoji.check} **Follow staff directions, they have the final say.**
        
        **\`\`\`B. The dont's\`\`\`**
        > ${client.emoji.cross} **No spam - This includes but is not limited too, loud/obnoxious noises in voice, @mention spam, character spam, image spam, and message spam.**
        > 
        > ${client.emoji.cross} **No Gorey, Sexual, or scary content - Screamer links, porn, nudity, death.**
        > 
        > ${client.emoji.cross} **No harassment - Including sexual harassment or encouraging of harassment.**
        > 
        > ${client.emoji.cross} **No self or user bots - These are in some cases against the discord TOS and if you need a bot for something use one of the bots already in the server**
        > 
        > ${client.emoji.cross} **Swearing is allowed so long as it isn't directed at another member.**`
    );
    message.channel.send(embed0);
    message.channel.send(embed1);
    message.channel.send(embed2);
    message.channel.send(embed3);
  }
  const embed1 = new MessageEmbed().setDescription("1");
  const embed2 = new MessageEmbed().setDescription("2");
  // createSimpleSlider(message.author.id, message.channel, [embed1, embed2]);
};
