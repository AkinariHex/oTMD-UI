import { getSession } from "next-auth/react";
import supabase from "../config/supabaseClient";

export default function Event({ session, playersList }) {
  const joinEvent = async () => {
    await supabase.from("event_players").insert({
      ID: session.id,
      rank: session.statistics.global_rank,
    });
    return window.location.reload();
  };

  const leaveEvent = async () => {
    await supabase.from("event_players").delete().eq("ID", session?.id);
    return window.location.reload();
  };

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
          <div className="subtitle date">12th January 2023 @17:00UTC</div>
          <div className="buttons">
            <button
              onClick={() =>
                window.open(
                  "https://discord.gg/XCw3SYuzvP?event=1045274987138928680",
                  "Discord Invite"
                )
              }
              id="discord"
            >
              <i
                className="bx bxl-discord-alt"
                style={{ fontSize: "20px" }}
              ></i>
              Join Discord Server
            </button>
            <button
              onClick={() =>
                window.open("https://twitch.tv/akinari_live", "Twitch Channel")
              }
              id="twitch"
            >
              <i className="bx bxl-twitch" style={{ fontSize: "20px" }}></i>
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
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    Discord Server
                  </a>{" "}
                  to get updates about the event!
                </li>
                <li>
                  This event will be entirely streamed on Twitch at{" "}
                  <a
                    href="https://twitch.tv/akinari_live"
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    akinari_live
                  </a>
                </li>
                <li>
                  Depending how many commentators I&apos;ll find, the stream
                  could be in{" "}
                  <b>
                    <i>Italian</i>
                  </b>{" "}
                  language, but feel free to join and message in{" "}
                  <b>
                    <i>English</i>
                  </b>{" "}
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
          <div className="message">
            Mappool will be released on <b>5th January 2023</b>
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
                    className={`${session?.id === user.users.ID ? "me" : ""}`}
                  >
                    <td>#{index + 1}</td>
                    <td>
                      <img
                        src={`http://s.ppy.sh/a/${user.users.ID}`}
                        alt={`${user.users.username} propic`}
                        onClick={() =>
                          window.open(
                            `https://osu.ppy.sh/users/${user.users.ID}`,
                            "User Window"
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
                            "User Window"
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
                    <td>#{user.rank.toLocaleString("en-US")}</td>
                    {/* <td>{user.points ?? 0}pt</td> */}
                    <td>{user.average.toLocaleString("en-US") ?? 0}</td>
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
    .from("event_players")
    .select("users(ID,username,country),rank,points,average")
    .order("rank", { ascending: true });

  return {
    props: {
      session,
      playersList,
    },
  };
}
