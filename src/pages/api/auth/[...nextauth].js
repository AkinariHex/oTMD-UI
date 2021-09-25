import NextAuth from "next-auth";
import Airtable from "airtable";


const postUserDB = (profile) => {
  const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

      base('Users').create([
        {
          "fields": {
            "ID": profile.id,
            "Username": profile.username,
            "Permissions": 'User',
            "Discord": profile.discord,
            "Twitter": profile.twitter
          }
        }
      ], function(err, records) {
        
        if (err) {
          console.error(err);
          return;
        }


    });
}

const checkUserDB = (profile) => {
  const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

  var mapped = ''

    base('Users').select({
      filterByFormula: `IF({ID} = '${profile.id}' , TRUE())`,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

        mapped = records.map((record) => {return record.fields})

        if(mapped[0] === undefined) postUserDB(profile)

    }, function done(err) {
        if (err) { console.error(err); return; }
    });


}


export default NextAuth({
  providers: [
    {
      id: "osu",
      name: "Osu!",
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

        //Write user in database
        checkUserDB(profile)
      }
      
      return Promise.resolve(token);

    },
  },
});
