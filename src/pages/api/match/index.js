import NextCors from 'nextjs-cors';
import supabase from '../../../config/supabaseClient';

function median_of_arr(arr) {
  const middle = (arr.length + 1) / 2;

  // Avoid mutating when sorting
  const sorted = [...arr].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;

  return isEven
    ? (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2
    : sorted[middle - 1];
}

async function getUsername(id) {
  let res = await fetch(
    `https://osu.ppy.sh/api/get_user?k=${process.env.OSU_APIKEY}&u=${id}`
  );
  res = await res.json();

  return res[0].username;
}

const calculateValue = async (players, maps, names) => {
  let playersID = Object.keys(players);

  let finalArray = await Promise.all(
    playersID.map(async (player) => {
      let name = await getUsername(player);

      let mapsID = Object.keys(players[player]);

      let playerTotalScore = 0;
      let mapsPlayedFromEveryone = [];

      mapsID.forEach((map) => {
        let playerScore = players[player][map];
        let medianScoreMap = median_of_arr(maps[map]);
        playerTotalScore += playerScore / medianScoreMap;
      });

      playersID.forEach((p) => {
        mapsPlayedFromEveryone.push(Object.keys(players[p]).length);
      });

      let matchCost =
        (playerTotalScore / mapsID.length) *
        Math.pow(mapsID.length / median_of_arr(mapsPlayedFromEveryone), 1 / 3);

      let json = {
        id: player,
        username: name,
        team: names[player].team,
        match_cost: matchCost.toFixed(2),
      };

      return json;
    })
  );

  return finalArray;
};

async function calculateMatchCost(match, warmups) {
  var playersData = {};
  var mapsData = {};
  var namesData = {};

  const apiV1data = JSON.parse(match);

  /* API V1 */
  apiV1data.games.forEach((game) => {
    if (warmups > 0) return warmups--;

    if (mapsData[game.beatmap_id] === undefined) {
      mapsData[game.beatmap_id] = [];
    }

    game.scores.forEach(async (score) => {
      if (playersData[score.user_id] === undefined) {
        playersData[score.user_id] = {};
      }

      if (namesData[score.user_id] === undefined) {
        namesData[score.user_id] = {};
      }

      playersData[score.user_id][game.beatmap_id] = parseInt(score.score);
      mapsData[game.beatmap_id].push(parseInt(score.score));
      namesData[score.user_id].team =
        score.team === '0' ? 'none' : score.team === '1' ? 'blue' : 'red';

      return namesData;
    });
  });

  let lobbyMC = await calculateValue(playersData, mapsData, namesData);

  let assignMedal = lobbyMC.sort((a, b) => b.match_cost - a.match_cost);

  assignMedal[0].medal = 1;
  assignMedal[1].medal = 2;
  if (assignMedal.length > 2) assignMedal[2].medal = 3;

  let redTeam = lobbyMC.filter((player) => player.team === 'red');
  let blueTeam = lobbyMC.filter((player) => player.team === 'blue');
  let noneTeam = lobbyMC.filter((player) => player.team === 'none');

  return { redTeam, blueTeam, noneTeam };
}

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST' && req.query.m === 'db') {
    const body = JSON.parse(req.body);

    const { data, err } = await supabase
      .from('users')
      .select('sendMatchesDiscord,discordChannelsMatch')
      .eq('api_key', body.webapikey);

    if (err) {
      return res.status(404).send(err);
    }

    if (data.length < 1) {
      return res.status(404).json({ message: 'Wrong apikey!' });
    }

    if (body.stage === 'Qualifiers') {
      await supabase.from('matches').insert([
        {
          owner: body.me,
          matchID: body.matchID,
          matchType: body.matchType,
          stage: body.stage,
          tournament: JSON.stringify(body?.tournament),
          player: JSON.stringify(body?.player),
          scores: JSON.stringify(body?.scores),
          totalMaps: body.totalMaps,
          startTime: body.matchStart,
        },
      ]);
    } else {
      await supabase.from('matches').insert([
        {
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
        },
      ]);
    }
    return res.status(200).json({ message: 'saved in DB' });
  }

  if (req.method === 'POST' && req.query.m === 'discordWebhook') {
    const body = JSON.parse(req.body);

    const { data, err } = await supabase
      .from('users')
      .select('sendMatchesDiscord,discordChannelsMatch')
      .eq('api_key', body.webapikey);

    let sendMatches = data[0].sendMatchesDiscord;
    let channels = JSON.parse(data[0].discordChannelsMatch);

    if (sendMatches === true && channels.length > 0) {
      var results = '';
      var dataWebhook = '';

      /* If match is 1vs1 or teamVS */
      if (body.stage !== 'Qualifiers') {
        results =
          (await body.scores.winner) === 1
            ? `:first_place: :red_circle: **${
                body.matchType === '1vs1'
                  ? `${body.players[0].username} | ${body.scores.player1}`
                  : `${body.teams[0]} | ${body.scores.team1}`
              }** - ${
                body.matchType === '1vs1'
                  ? `${body.scores.player2} | ${body.players[1].username}`
                  : `${body.scores.team2} | ${body.teams[1]}`
              } :blue_circle:`
            : `:red_circle: ${
                body.matchType === '1vs1'
                  ? `${body.players[0].username} | ${body.scores.player1}`
                  : `${body.teams[0]} | ${body.scores.team1}`
              } - **${
                body.matchType === '1vs1'
                  ? `${body.scores.player2} | ${body.players[1].username}`
                  : `${body.scores.team2} | ${body.teams[1]}`
              }** :blue_circle: :first_place:`;

        let matchCost = await calculateMatchCost(body.matchJSON, body.warmups);

        dataWebhook = {
          content: '',
          embeds: [
            {
              author: {
                name: `${body.tournament.acronym} ${
                  body.tournament.name !== '' ? `- ${body.tournament.name}` : ''
                }`,
                url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
                icon_url: `https://akinariosu.s-ul.eu/f72xTlsv`,
              },
              title: `${body.tournament.acronym}: (${
                body.matchType === '1vs1'
                  ? body.players[0].username
                  : body.teams[0]
              }) vs (${
                body.matchType === '1vs1'
                  ? body.players[1].username
                  : body.teams[1]
              })`,
              url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
              /* description: `${results}\n\n${body.matchType} - ${body.stage} - BO${body.bestOF} - ${body.warmups} warmups - [MP Link](https://osu.ppy.sh/community/matches/${body.matchID})`,
               */
              fields: [
                /* Red Team */
                {
                  name: `Match Cost`,
                  value: `${
                    body.scores.winner === 1 ? ':medal:' : ''
                  } :red_circle: ${body.scores.winner === 1 ? '**' : ''}${
                    body.matchType === '1vs1'
                      ? `${body.players[0].username} | ${body.scores.player1}`
                      : `${body.teams[0]} | ${body.scores.team1}`
                  }${body.scores.winner === 1 ? '**' : ''}\n${
                    body.matchType === '1vs1'
                      ? matchCost.noneTeam
                          .map((player) => {
                            if (player.id === body.players[0].userid) {
                              return `[${
                                player.username
                              }](https://osu.ppy.sh/users/${player.id}): ${
                                player.medal ? '**' : ''
                              }${player.match_cost}${player.medal ? '**' : ''}${
                                player.medal === 1
                                  ? '🥇'
                                  : player.medal === 2
                                  ? '🥈'
                                  : player.medal === 3
                                  ? '🥉'
                                  : ''
                              }`;
                            }
                          })
                          .join('\n')
                      : matchCost.redTeam
                          .map(
                            (player) =>
                              `[${player.username}](https://osu.ppy.sh/users/${
                                player.id
                              }): ${player.medal ? '**' : ''}${
                                player.match_cost
                              }${player.medal ? '**' : ''}${
                                player.medal === 1
                                  ? '🥇'
                                  : player.medal === 2
                                  ? '🥈'
                                  : ''
                              }`
                          )
                          .join('')
                  }`,
                  inline: true,
                },
                /* Blue Team */
                {
                  name: `\u200b`,
                  value: `${body.scores.winner === 2 ? '**' : ''}${
                    body.matchType === '1vs1'
                      ? `${body.scores.player2} | ${body.players[1].username}`
                      : `${body.scores.team2} | ${body.teams[1]}`
                  }${body.scores.winner === 2 ? '**' : ''} :blue_circle: ${
                    body.scores.winner === 2 ? ':medal:' : ''
                  }\n${
                    body.matchType === '1vs1'
                      ? matchCost.noneTeam
                          .map((player) => {
                            if (player.id === body.players[1].userid) {
                              return `[${
                                player.username
                              }](https://osu.ppy.sh/users/${player.id}): ${
                                player.medal ? '**' : ''
                              }${player.match_cost}${player.medal ? '**' : ''}${
                                player.medal === 1
                                  ? '🥇'
                                  : player.medal === 2
                                  ? '🥈'
                                  : ''
                              }`;
                            }
                          })
                          .join('')
                      : matchCost.blueTeam
                          .map(
                            (player) =>
                              `[${player.username}](https://osu.ppy.sh/users/${
                                player.id
                              }): ${player.medal ? '**' : ''}${
                                player.match_cost
                              }${player.medal ? '**' : ''}${
                                player.medal === 1
                                  ? '🥇'
                                  : player.medal === 2
                                  ? '🥈'
                                  : player.medal === 3
                                  ? '🥉'
                                  : ''
                              }`
                          )
                          .join('\n')
                  }`,
                  inline: true,
                },
                {
                  name: '\u200b',
                  value: `${body.matchType} - ${body.stage} - BO${body.bestOF} - ${body.warmups} warmups - [MP Link](https://osu.ppy.sh/community/matches/${body.matchID})`,
                  inline: false,
                },
              ],
              color: body.scores.winner === 1 ? '16731212' : '4748982',
              footer: {
                text: getTimeSpent(body.matchStart),
              },
            },
          ],
          attachments: [],
        };
      } else if (body.stage === 'Qualifiers') {
        var mods = {
          NM: '<:nomod:868095234217750558>',
          NF: '<:nofail:868095234230353960>',
          EZ: '<:easy:868095234108710922>',
          HD: '<:hidden:868095234150658079>',
          HR: '<:hardrock:868095234129690664>',
          DT: '<:doubletime:868095234079350844>',
          HT: '<:halftime:943890234330972160>',
          FL: '<:flashlight:868095233932533781>',
        };

        await body?.scores?.list.forEach((object) => {
          let modstring = '';
          object?.mods.forEach((mod) => {
            modstring += mods[mod];
          });
          results += `${modstring} ${object.score}\n`;
        });

        dataWebhook = {
          embeds: [
            {
              author: {
                name: `${body.tournament.acronym} ${
                  body.tournament.name !== '' ? `- ${body.tournament.name}` : ''
                }`,
                url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
                icon_url: `https://akinariosu.s-ul.eu/f72xTlsv`,
              },
              title: `${body.player.username}'s Qualifier`,
              url: `https://osu.ppy.sh/community/matches/${body.matchID}`,
              description: `${results}\n**Average: ${body.scores.average}** - Played Maps: ${body.scores.list.length} - Total maps: ${body.totalMaps} - [MP Link](https://osu.ppy.sh/community/matches/${body.matchID})`,
              color: '4748982',
              thumbnail: {
                url: `http://s.ppy.sh/a/${body.me}`,
              },
              footer: {
                text: getTimeSpent(body.matchStart),
              },
            },
          ],
          attachments: [],
        };
      }

      await channels.forEach(async (channel) => {
        await fetch(channel.WebhookURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataWebhook),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(); // Will take you to the `catch` below
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });

      return res.status(200).json({ message: 'posted on Discord!' });
    }
    return res.status(404).json({ error: 'no discord post' });
  }

  return res.status(404).json({ error: 'invalid method' });
}

const getTimeSpent = (startTime) => {
  let startMatch = new Date(startTime);
  let finishMatch = new Date(Date.now());
  var diffMs = finishMatch.getTime() - startMatch.getTime();
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  return `Match duration: ${diffHrs}h ${diffMins}m`;
};
