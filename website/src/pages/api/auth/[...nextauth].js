import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.providerAccountId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.token = token;
            return session;
        },
    },
};
export default NextAuth(authOptions);
