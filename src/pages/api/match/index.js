import Airtable from "airtable";
import Cors from "cors";
import { v4 as uuidv4 } from "uuid";

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
    process.env.AIRTABLE_BASE
  );

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    base("Users")
      .select({
        filterByFormula: `IF({Apikey} = '${body.webapikey}' , TRUE())`,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length > 0) {
            base("Matches").create(
              [
                {
                  fields: {
                    UUID: uuidv4(),
                    Owner: body.me,
                    MatchID: body.matchID,
                    MatchType: body.matchType,
                    Stage: body.stage,
                    BestOF: body.bestOF,
                    Warmups: body.warmups,
                    Tournament: body.tournament,
                    Players: body.players,
                    Teams: body.teams,
                    Scores: body.scores,
                  },
                },
              ],
              function (err, records) {
                if (err) {
                  console.error(err);
                  return res.status(404).json({ error: err });
                }
              }
            );

            return res.status(200).json({ status: "success" });

            /* var { SendMatchesDiscord, DiscordChannelsMatch } =
              records[0].fields;
            DiscordChannelsMatch = JSON.parse(DiscordChannelsMatch);

            if (
              SendMatchesDiscord === "true" &&
              DiscordChannelsMatch.length > 0
            ) {
              DiscordChannelsMatch.forEach(async (channel) => {
                await soloMatch(body, channel);
              });
              return res.status(200).json({ status: "done" });
            } else {
              return res
                .status(404)
                .send({ error: "You haven't enabled the Discord Webhooks" });
            } */
          } else {
            return res.status(404).json({ message: "Wrong apikey!" });
          }
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
        }
      );
  }
}

const soloMatch = async (body, channel) => {
  let testData = {
    embeds: [
      {
        author: {
          name: "o!TMD",
          url: "https://google.com",
          icon_url: "https://akinariosu.s-ul.eu/f72xTlsv",
        },
        title: "Webhook Test",
        url: "https://google.com",
        description:
          "The Webhook works correctly, your matches will be displayed in this channel!",
        color: 0x4876b6,
      },
    ],
  };

  await fetch(channel.WebhookURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testData),
  });
};
