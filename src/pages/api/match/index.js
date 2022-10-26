import Cors from "cors";
import supabase from "../../../config/supabaseClient";

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
  const match = async (body, channel) => {
    var results = "";
    var Data = "";

    /* If match is 1vs1 or teamVS */
    if (body.stage !== "Qualifiers") {
      results =
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

      Data = {
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
            color: body.scores.winner === 1 ? 0xff4c4c : 0x4876b6,
            footer: {
              text: getTimeSpent(body.matchStart),
            },
          },
        ],
      };
    }

    /* If match is Qualifiers */
    if (body.stage === "Qualifiers") {
      var mods = {
        NM: "<:nomod:868095234217750558>",
        NF: "<:nofail:868095234230353960>",
        EZ: "<:easy:868095234108710922>",
        HD: "<:hidden:868095234150658079>",
        HR: "<:hardrock:868095234129690664>",
        DT: "<:doubletime:868095234079350844>",
        HT: "<:halftime:943890234330972160>",
        FL: "<:flashlight:868095233932533781>",
      };

      await body.scores.list.forEach((object) => {
        let modstring = "";
        object.mods.forEach((mod) => {
          modstring += mods[mod];
        });
        results += `${modstring} ${object.score}\n`;
      });

      Data = {
        embeds: [
          {
            author: {
              name: `${body.tournament.acronym} ${
                body.tournament.name !== "" ? `- ${body.tournament.name}` : ""
              }`,
              url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
              icon_url: `https://akinariosu.s-ul.eu/f72xTlsv`,
            },
            title: `${body.player.username}'s Qualifier`,
            url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
            description: `${results}\n**Average: ${body.scores.average}** - Played Maps: ${body.scores.list.length} - Total maps: ${body.totalMaps} - [MP Link](https://osu.ppy.sh/community/matches/${body.matchID})`,
            color: 0x4876b6,
            thumbnail: {
              url: `http://s.ppy.sh/a/${body.me}`,
            },
            footer: {
              text: getTimeSpent(body.matchStart),
            },
          },
        ],
      };
    }

    await fetch(channel.WebhookURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    return;
  };

  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const { data, err } = await supabase
      .from("users")
      .select("sendMatchesDiscord,discordChannelsMatch")
      .eq("api_key", body.webapikey);

    if (err) {
      return res.status(404).send(err);
    }

    if (data.length < 1) {
      return res.status(404).json({ message: "Wrong apikey!" });
    }

    if (body.stage === "Qualifiers") {
      supabase.from("matches").insert({
        owner: body.me,
        matchID: body.matchID,
        matchType: body.matchType,
        stage: body.stage,
        tournament: JSON.stringify(body?.tournament),
        player: JSON.stringify(body?.player),
        scores: JSON.stringify(body?.scores),
        totalMaps: body.totalMaps,
        startTime: body.matchStart,
      });
    } else {
      supabase.from("matches").insert({
        owner: body.me,
        matchID: body.matchID,
        matchType: body.matchType,
        stage: body.stage,
        bestOF: body.bestOF,
        warmups: body.warmups,
        tournament: JSON.stringify(body?.tournament),
        players: JSON.stringify(body?.players),
        teams: JSON.stringify(body?.teams),
        scores: JSON.stringify(body?.scores),
        startTime: body.matchStart,
      });
    }

    var { sendMatchesDiscord, discordChannelsMatch } = data;
    discordChannelsMatch = JSON.parse(discordChannelsMatch);

    if (sendMatchesDiscord === "true" && discordChannelsMatch.length > 0) {
      discordChannelsMatch.forEach(async (channel) => {
        await match(body, channel);
      });
      return res.status(200).json({ status: "done" });
    } else {
      return res
        .status(404)
        .send({ error: "You haven't enabled the Discord Webhooks" });
    }
  }
  return res.status(404).json({ error: "invalid method" });
}

const getTimeSpent = (startTime) => {
  let startMatch = new Date(startTime);
  let finishMatch = new Date(Date.now());
  var diffMs = finishMatch.getTime() - startMatch.getTime();
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `Match duration: ${diffHrs}h ${diffMins}m`;
};
