import Airtable from "airtable";

export default function handler(req, res) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
    process.env.AIRTABLE_BASE
  );

  if (req.method === "GET") {
    if (req.query.u !== null) {
      setTimeout(async () => {
        base("Users")
          .select({
            filterByFormula: `IF({ID} = '${req.query.u}' , TRUE())`,
            view: "Grid view",
          })
          .eachPage(
            function page(records, fetchNextPage) {
              var mapped = [
                {
                  ID: records[0].get("ID"),
                  Username: records[0].get("Username"),
                  UUID: records[0].get("UUID"),
                  Permissions: records[0].get("Permissions"),
                  Discord: records[0].get("Discord"),
                  Twitter: records[0].get("Twitter"),
                  DateJoin: records[0].get("DateJoin"),
                  Apikey: records[0].get("Apikey"),
                  SendMatchesDiscord: records[0].get("SendMatchesDiscord"),
                  DiscordChannelsMatch: records[0].get("DiscordChannelsMatch"),
                  RecordID: records[0].id,
                },
              ];

              return res.status(200).json(mapped);
            },
            function done(err) {
              if (err) {
                console.error(err);
                return res.status(401);
              }
              res.end();
            }
          );
      }, 1000);
    } else {
      return res.status(404).json({ error: "No user specified" });
    }
  } else {
    return res.status(404).json({ message: "No Authorization" });
  }
}
