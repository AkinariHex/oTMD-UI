import { ArrowDown } from 'iconsax-react';
import { getSession } from 'next-auth/react';
import supabase from '../config/supabaseClient';

export default function Event({ session, playersList }) {
  const joinEvent = async () => {
    await supabase.from('event_players').insert({
      ID: session.id,
      rank: session.statistics.global_rank,
    });
    return window.location.reload();
  };

  const leaveEvent = async () => {
    await supabase.from('event_players').delete().eq('ID', session?.id);
    return window.location.reload();
  };

  let qualifiersPool = [
    {
      title: 'Hana - Sakura no Uta',
      difficulty: 'Etude of Light and Sound',
      mapper: 'jasontime12345',
      starRating: '6.48',
      beatmapID: '2576664',
      beatmapsetID: '1239324',
      mod: 'NM',
      number: '1',
    },
    {
      title: 'Ice - 02: Amber Wishes',
      difficulty: "Shizuku's Extra",
      mapper: 'FrenZ396',
      starRating: '6.11',
      beatmapID: '1714161',
      beatmapsetID: '801704',
      mod: 'NM',
      number: '2',
    },
    {
      title: 'Perfume - Daijobanai',
      difficulty: 'Expert',
      mapper: 'Leminine',
      starRating: '6.13',
      beatmapID: '966034',
      beatmapsetID: '450272',
      mod: 'NM',
      number: '3',
    },
    {
      title: 'Lime - 8bit Voyager',
      difficulty: 'Journey',
      mapper: 'Hazu-',
      starRating: '6.12',
      beatmapID: '2549327',
      beatmapsetID: '1225869',
      mod: 'NM',
      number: '4',
    },
    {
      title: 'Yousei Teikoku - Mischievous of Alice',
      difficulty: 'Extreme',
      mapper: 'Hazu-',
      starRating: '6.28',
      beatmapID: '1315116',
      beatmapsetID: '623960',
      mod: 'HD',
      number: '1',
    },
    {
      title: 'Hyadain - Rap de Chocobo',
      difficulty: 'Insane',
      mapper: 'mrowswares',
      starRating: '5.28',
      beatmapID: '2699675',
      beatmapsetID: '1125851',
      mod: 'HD',
      number: '2',
    },
    {
      title: 'TUYU - Daemonisch',
      difficulty: "Guan's Extra",
      mapper: 'Keqing',
      starRating: '6.37',
      beatmapID: '2973619',
      beatmapsetID: '1443294',
      mod: 'HR',
      number: '1',
    },
    {
      title: 'A.SAKA - Nanatsu Hiiragisuikou',
      difficulty: "Pata-Mon's Hyper",
      mapper: 'mrowswares',
      starRating: '5.58',
      beatmapID: '3396297',
      beatmapsetID: '1650533',
      mod: 'HR',
      number: '2',
    },
    {
      title: 'senya - Theta de Tsukisashite',
      difficulty: 'Theta',
      mapper: 'Serafeim',
      starRating: '6.4',
      beatmapID: '2801940',
      beatmapsetID: '1353531',
      mod: 'DT',
      number: '1',
    },
    {
      title: 'Hanatan - Kitsune no Yomeiri',
      difficulty: 'Kitsuneko',
      mapper: 'Ryafuka',
      starRating: '6.48',
      beatmapID: '144387',
      beatmapsetID: '46070',
      mod: 'DT',
      number: '2',
    },
  ];

  let matchesPool = [
    {
      title: 'AliA - utopia',
      difficulty: 'Feelings',
      mapper: 'Akitoshi',
      starRating: '6.56',
      beatmapID: '2335100',
      beatmapsetID: '1117851',
      mod: 'NM',
      number: '1',
    },
    {
      title: 'Xi - Shoujo Kisoukyoku ~ Speed Battle',
      difficulty: 'Extra Stage',
      mapper: 'Leader',
      starRating: '6.42',
      beatmapID: '2670759',
      beatmapsetID: '1286282',
      mod: 'NM',
      number: '2',
    },
    {
      title: 'yuikonnu x sana - Fuzzy Future',
      difficulty: "kwk's Extra",
      mapper: 'Aeril',
      starRating: '6.27',
      beatmapID: '1566520',
      beatmapsetID: '545956',
      mod: 'NM',
      number: '3',
    },
    {
      title: 'Mysteka - Hesperos',
      difficulty: '3dyoshispin',
      mapper: 'Acylica',
      starRating: '6.26',
      beatmapID: '3287875',
      beatmapsetID: '1610294',
      mod: 'NM',
      number: '4',
    },
    {
      title: 'Project Gabbangelion - Lolit Speed (Cut Ver.)',
      difficulty: 'crack collab',
      mapper: 'alden',
      starRating: '6.73',
      beatmapID: '3287485',
      beatmapsetID: '1610082',
      mod: 'NM',
      number: '5',
    },
    {
      title: 'xi - Mirage Garden',
      difficulty: "Down's Extra",
      mapper: 'DeviousPanda',
      starRating: '6.73',
      beatmapID: '3395093',
      beatmapsetID: '1663184',
      mod: 'NM',
      number: '6',
    },
    {
      title: 'Imaginary Shame Daimajin 50 - BOCCHI ROCK',
      difficulty: 'Guitar Devil',
      mapper: 'Arushii09',
      starRating: '6.39',
      beatmapID: '3930612',
      beatmapsetID: '1906151',
      mod: 'HD',
      number: '1',
    },
    {
      title: 'ShinRa-Bansho - Subarashiki Hani World',
      difficulty: 'Sentience',
      mapper: 'Kurashina Asuka',
      starRating: '5.63',
      beatmapID: '3183124',
      beatmapsetID: '1558276',
      mod: 'HD',
      number: '2',
    },
    {
      title: 'HyuN - Illusion of Inflict',
      difficulty: "N/A's Extra",
      mapper: 'Icekalt',
      starRating: '5.95',
      beatmapID: '2109396',
      beatmapsetID: '968923',
      mod: 'HD',
      number: '3',
    },
    {
      title: 'Endorfin. - Luminous Rage',
      difficulty: 'Lucent',
      mapper: 'Kibbleru',
      starRating: '6.59',
      beatmapID: '1403318',
      beatmapsetID: '492845',
      mod: 'HR',
      number: '1',
    },
    {
      title: 'ZUN - The Venerable Ancient Battlefield ~ Suwa Foughten Field',
      difficulty: 'Extra',
      mapper: 'sjoy',
      starRating: '6.1',
      beatmapID: '266778',
      beatmapsetID: '100444',
      mod: 'HR',
      number: '2',
    },
    {
      title: 'Zekk - Freefall',
      difficulty: 'Extra',
      mapper: 'Fursum',
      starRating: '5.7',
      beatmapID: '3156885',
      beatmapsetID: '1544463',
      mod: 'HR',
      number: '3',
    },
    {
      title: 'Shinra-Bansho - Aqua Terrarium',
      difficulty: "DelizeE's Terrarium",
      mapper: 'CoLouRed GlaZeE',
      starRating: '6.6',
      beatmapID: '1925706',
      beatmapsetID: '922144',
      mod: 'DT',
      number: '1',
    },
    {
      title: 'DJ Amuro remixed by DM Ashura - AAA',
      difficulty: 'Insane',
      mapper: 'Clickz',
      starRating: '6.6',
      beatmapID: '80515',
      beatmapsetID: '22607',
      mod: 'DT',
      number: '2',
    },
    {
      title: 'Ueda Reina - Literature',
      difficulty: 'Collab Insane',
      mapper: '-Hitomi',
      starRating: '6.3',
      beatmapID: '3606065',
      beatmapsetID: '1749893',
      mod: 'DT',
      number: '3',
    },
    {
      title: 'Nakiri Ayame - Good-bye sengen',
      difficulty: 'Extra',
      mapper: 'Mir',
      starRating: '5.8',
      beatmapID: '3020125',
      beatmapsetID: '1471082',
      mod: 'FM',
      number: '1',
    },
    {
      title: 'ZUN - Solar Sect of Mystic Wisdom ~ Nuclear Fusion',
      difficulty: 'Extra Stage',
      mapper: 'pieguy1372',
      starRating: '5.55',
      beatmapID: '78166',
      beatmapsetID: '22697',
      mod: 'FM',
      number: '2',
    },
    {
      title: 'Sound Souler - Paradise',
      difficulty: "Asaiga & kwk's Expert",
      mapper: 'kwk',
      starRating: '5.51',
      beatmapID: '1573887',
      beatmapsetID: '686777',
      mod: 'FM',
      number: '3',
    },
    {
      title: 'BlackY - Double Pendulum',
      difficulty: 'Reflector Program v1.0 -Next Generation-',
      mapper: 'rrtyui',
      starRating: '6.44',
      beatmapID: '1472242',
      beatmapsetID: '695053',
      mod: 'TB',
      number: '1',
    },
  ];

  return (
    <div className="homeContent">
      <div className="eventContainer">
        <div className="header">
          <object
            type="image/svg+xml"
            data="/img/otmdLOGO.svg"
            className="logoAppHeader"
            alt="otmd logo"
            loading="lazy"
          />
          <div className="title">osu! Tourney Match Displayer v2.0</div>
          <div className="subtitle">App Release and Showmatches</div>
          <div className="subtitle date">15th January 2023 @17:00UTC</div>
          <div className="buttons">
            <button
              onClick={() =>
                window.open(
                  'https://discord.gg/XCw3SYuzvP?event=1045274987138928680',
                  'Discord Invite'
                )
              }
              id="discord"
            >
              <i
                className="bx bxl-discord-alt"
                style={{ fontSize: '20px' }}
              ></i>
              Join Discord Server
            </button>
            <button
              onClick={() =>
                window.open('https://twitch.tv/akinari_live', 'Twitch Channel')
              }
              id="twitch"
            >
              <i className="bx bxl-twitch" style={{ fontSize: '20px' }}></i>
              Twitch Channel
            </button>
          </div>
        </div>
        <div className="section">
          <div className="subheader">Rules</div>
          <div className="cards">
            <div className="card">
              <div className="title">
                <span>General</span>
                <span>17:00UTC</span>
              </div>
              <ul>
                <li>Everyone can register</li>
                <li>
                  Players <b>must</b> be in the
                  <br />
                  <a
                    href="https://discord.gg/XCw3SYuzvP?event=1045274987138928680"
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    Discord Server
                  </a>{' '}
                  to get updates about the event!
                </li>
                <li>
                  This event will be entirely streamed on Twitch at{' '}
                  <a
                    href="https://twitch.tv/akinari_live"
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    akinari_live
                  </a>
                </li>
                <li>
                  Depending how many commentators I&apos;ll find, the stream
                  could be in{' '}
                  <b>
                    <i>Italian</i>
                  </b>{' '}
                  language, but feel free to join and message in{' '}
                  <b>
                    <i>English</i>
                  </b>{' '}
                  too!
                </li>
                <li>App will be released at the end of the stream</li>
              </ul>
            </div>
            <div className="card">
              <div className="title">
                <span>Qualifiers</span>
                <span>18:00UTC</span>
              </div>
              <ul>
                <li>
                  Depending on how many players will register, we will make
                  qualifiers lobbies every 16 players
                </li>
                <li>
                  All the qualifiers lobbies will be played at the same time
                </li>
                <li>
                  Top 16 players will be ordered by <b>Average</b> score using
                  descending order.
                </li>
                <li>
                  Top 2 players will play the <b>1vs1</b> Match and be captains
                  for <b>TeamVS</b> Match
                </li>
                <li>
                  Top 16 players will proceed to <b>TeamVS</b> Match
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="title">
                <span>TeamVS</span>
                <span>19:00UTC</span>
              </div>
              <ul>
                <li>
                  <b>Top 1</b> and <b>Top 2</b> will be the captains
                </li>
                <li>
                  The top 16 players from qualifiers will be chosen by the
                  captains using <b>Draft</b> format
                </li>
                <li>Best of 9</li>
                <li>1 Ban</li>
              </ul>
              <div className="prize">
                <span>Players gets:</span>
                <img
                  src="/img/badges/otmd_event_team_winner.png"
                  alt="1st badge"
                />
                <img
                  src="/img/badges/otmd_event_team_2nd.png"
                  alt="2nd badge"
                />
              </div>
              <span className="infoMess">
                Badges will be displayed on o!TMD profiles and Akinari Website
                profiles
              </span>
            </div>
            <div className="card">
              <div className="title">
                <span>1vs1</span>
                <span>20:00UTC</span>
              </div>
              <ul>
                <li>
                  <b>Top 1</b> will match against <b>Top 2</b>
                </li>
                <li>Best of 9</li>
                <li>1 Ban</li>
              </ul>
              <div className="prize">
                <span>Winner get:</span>
                <img
                  src="/img/badges/otmd_event_winner.png"
                  alt="Winner badge"
                />
              </div>
              <span className="infoMess">
                Badge will be displayed on o!TMD profile and Akinari Website
                profile
              </span>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="subheader">Mappool</div>
          <div className="stage">Qualifiers</div>
          <div className="mappool">
            {qualifiersPool.map((map) => {
              return (
                <div
                  key={`${map.mod}${map.number}`}
                  className={`map ${map.mod}`}
                  style={{
                    backgroundImage: `url('https://assets.ppy.sh/beatmaps/${map.beatmapsetID}/covers/cover.jpg')`,
                  }}
                >
                  <div className="mod">
                    {map.mod}
                    {map.number}
                  </div>
                  <div
                    className="info"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        `https://osu.ppy.sh/beatmapsets/${map.beatmapsetID}#osu/${map.beatmapID}`,
                        'newtab'
                      );
                    }}
                  >
                    {map.title} [{map.difficulty}] ({map.mapper})
                  </div>
                  <div className="starRating">{map.starRating}*</div>
                  <div className="beatmapID">{map.beatmapID}</div>
                  <a
                    className="downloadBTN"
                    href={`https://osu.ppy.sh/beatmapsets/${map.beatmapsetID}/download`}
                  >
                    <ArrowDown size="22" />{' '}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="stage">Matches</div>
          <div className="mappool">
            {matchesPool.map((map) => {
              return (
                <div
                  key={`${map.mod}${map.number}`}
                  className={`map ${map.mod}`}
                  style={{
                    backgroundImage: `url('https://assets.ppy.sh/beatmaps/${map.beatmapsetID}/covers/cover.jpg')`,
                  }}
                >
                  <div className="mod">
                    {map.mod}
                    {map.number}
                  </div>
                  <div
                    className="info"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        `https://osu.ppy.sh/beatmapsets/${map.beatmapsetID}#osu/${map.beatmapID}`,
                        'newtab'
                      );
                    }}
                  >
                    {map.title} [{map.difficulty}] ({map.mapper})
                  </div>
                  <div className="starRating">{map.starRating}*</div>
                  <div className="beatmapID">{map.beatmapID}</div>
                  <a
                    className="downloadBTN"
                    href={`https://osu.ppy.sh/beatmapsets/${map.beatmapsetID}/download`}
                  >
                    <ArrowDown size="22" />{' '}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="section">
          <div className="buttons">
            {session ? (
              playersList.filter((player) => player.users.ID === session.id)
                .length > 0 ? (
                <div className="button leave" onClick={leaveEvent}>
                  Leave the event
                </div>
              ) : (
                <div className="button join" onClick={joinEvent}>
                  Join the event
                </div>
              )
            ) : (
              <div className="alert">
                You have to login to be able to join the event!
              </div>
            )}
          </div>
          <div className="subheader">Players</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Player</th>
                <th>Rank</th>
                {/* <th>Points</th> */}
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {playersList.map((user, index) => {
                let country = JSON.parse(user.users.country);
                let flag = country.code;

                return (
                  <tr
                    key={index}
                    className={`${session?.id === user.users.ID ? 'me' : ''}`}
                  >
                    <td>#{index + 1}</td>
                    <td>
                      <img
                        src={`http://s.ppy.sh/a/${user.users.ID}`}
                        alt={`${user.users.username} propic`}
                        onClick={() =>
                          window.open(
                            `https://osu.ppy.sh/users/${user.users.ID}`,
                            'User Window'
                          )
                        }
                      />
                    </td>
                    <td>
                      <div
                        className="name"
                        onClick={() =>
                          window.open(
                            `https://osu.ppy.sh/users/${user.users.ID}`,
                            'User Window'
                          )
                        }
                      >
                        {user.users.username}
                      </div>
                      <img
                        src={`https://raw.githubusercontent.com/ppy/osu-resources/master/osu.Game.Resources/Textures/Flags/${flag}.png`}
                        alt={`${user.users.username} flag`}
                        className="flag"
                      />
                    </td>
                    <td>#{user.rank.toLocaleString('en-US')}</td>
                    <td>{user.average.toLocaleString('en-US') ?? 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);

  let { data: playersList, error } = await supabase
    .from('event_players')
    .select('users(ID,username,country),rank,points,average')
    .order('average', { ascending: true });

  return {
    props: {
      session,
      playersList,
    },
  };
}
