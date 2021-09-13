import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "osu",
      name: "OSU",
      type: "oauth",
      version: "2.0",
      scope: "identify",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://osu.ppy.sh/oauth/token",
      requestTokenUrl: "https://osu.ppy.sh/oauth/token",
      authorizationUrl: "https://osu.ppy.sh/oauth/authorize?response_type=code",
      profileUrl: "https://osu.ppy.sh/api/v2/me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          image: profile.avatar_url,
          email: null,
        };
      },
      clientId: process.env.OSU_CLIENT_ID,
      clientSecret: process.env.OSU_CLIENT_SECRET,
    },
  ],

  session: {
    jwt: true,
  },

  callbacks: {
    async session(session, user) {
      // Get data from OSU API
      const userData = await (
        await fetch(`https://osu.ppy.sh/api/v2/me`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
      ).json();

      if (userData.authentication === "basic") return {};

      return userData;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        token.refresh_token = account.refresh_token;
      }

      return Promise.resolve(token);
    },
  },
});
