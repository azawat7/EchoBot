// module.exports = (client) => {
//   const isInvite = async (guild, code) => {
//     return await new Promise((resolve) => {
//       guild.fetchInvites().then((invites) => {
//         for (const invite of invites) {
//           if (code === invite[0]) {
//             resolve(true);
//             return;
//           }
//         }

//         resolve(false);
//       });
//     });
//   };

//   client.on("message", async (message) => {
//     const code = message.content.split("discord.gg/")[1];
//     console.log("CODE:", code);

//     if (message.content.includes("discord.gg/")) {
//       const isOurInvite = await isInvite(message.guild, code);
//       if (!isOurInvite) {
//         // we know that they are advertising an outside discord server
//       }
//     }
//   });
// };
