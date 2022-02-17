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
        pageSize: 1,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length !== 0) {
            if (body.stage === "Qualifiers") {
              base("Matches").create(
                [
                  {
                    fields: {
                      UUID: uuidv4(),
                      Owner: body.me,
                      MatchID: body.matchID,
                      MatchType: body.matchType,
                      Stage: body.stage,
                      Tournament: JSON.stringify(body?.tournament),
                      Player: JSON.stringify(body?.player),
                      Scores: JSON.stringify(body?.scores),
                      TotalMaps: body.totalMaps,
                      StartTime: body.matchStart,
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
            } else {
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
                      Tournament: JSON.stringify(body?.tournament),
                      Players: JSON.stringify(body?.players),
                      Teams: JSON.stringify(body?.teams),
                      Scores: JSON.stringify(body?.scores),
                      StartTime: body.matchStart,
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
            }

            var { SendMatchesDiscord, DiscordChannelsMatch } =
              records[0].fields;
            DiscordChannelsMatch = JSON.parse(DiscordChannelsMatch);

            if (
              SendMatchesDiscord === "true" &&
              JSON.parse(DiscordChannelsMatch).length > 0
            ) {
              JSON.parse(DiscordChannelsMatch).forEach(async (channel) => {
                if (body.stage !== "Qualifiers") {
                  await match(body, channel);
                } else {
                  await qualifiers(body, channel);
                }
              });
              return res.status(200).json({ status: "done" });
            } else {
              return res
                .status(404)
                .send({ error: "You haven't enabled the Discord Webhooks" });
            }
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

const qualifiers = async (body, channel) => {
  let Data = {
    embeds: [
      {
        author: {
          name: `${body.tournament.acronym} ${
            body.tournament.name !== "" ? `- ${body.tournament.name}` : ""
          }`,
          url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
          icon_url: `https://akinariosu.s-ul.eu/f72xTlsv`,
        },
        title: ``,
        url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
        description: `${results}\n\n${body.matchType} - ${body.stage} - BO${body.bestOF} - ${body.warmups} warmups`,
        color: 0x4876b6,
      },
    ],
  };

  await fetch(channel.WebhookURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};

const match = async (body, channel) => {
  let results =
    body.scores.winner === 1
      ? `:first_place: :red_circle: **${
          body.matchType === "1vs1"
            ? `${body.players[0].username} | ${body.scores.player1}`
            : `${body.teams[0]} | ${body.scores.team1}`
        }** - ${
          body.matchType === "1vs1"
            ? `${body.scores.player2} | ${body.players[1].username}`
            : `${body.scores.team2} | ${body.teams[1]}`
        } :blue_circle:`
      : `:red_circle: ${
          body.matchType === "1vs1"
            ? `${body.players[0].username} | ${body.scores.player1}`
            : `${body.teams[0]} | ${body.scores.team1}`
        } - **${
          body.matchType === "1vs1"
            ? `${body.scores.player2} | ${body.players[1].username}`
            : `${body.scores.team2} | ${body.teams[1]}`
        }** :blue_circle: :first_place:`;

  let Data = {
    embeds: [
      {
        author: {
          name: `${body.tournament.acronym} ${
            body.tournament.name !== "" ? `- ${body.tournament.name}` : ""
          }`,
          url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
          icon_url: `https://akinariosu.s-ul.eu/f72xTlsv`,
        },
        /* title: `(${
          body.matchType === "1vs1" ? body.players[0].username : body.teams[0]
        }) vs (${
          body.matchType === "1vs1" ? body.players[1].username : body.teams[1]
        })`, */
        url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
        description: `${results}\n\n${body.matchType} - ${body.stage} - BO${body.bestOF} - ${body.warmups} warmups - [MP Link](https://osu.ppy.sh/community/matches/${body.matchID})`,
        color: 0x4876b6,
      },
    ],
  };

  await fetch(channel.WebhookURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};
