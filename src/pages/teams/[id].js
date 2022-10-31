import { getSession } from "next-auth/react";
import { Star1, Timer1, ImportCircle } from "iconsax-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddMap from "../../components/Forms/AddMap";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

export default function Team({
  session,
  token,
  team,
  players,
  mappools,
  scores,
  teamID,
}) {
  const [value, setValue] = useState(0);
  const [indexToChange, setIndexToChange] = useState(0);
  const [playerChange, setPlayerChange] = useState("");
  const [mapChange, setMapChange] = useState("");

  const [activeStage, setActiveStage] = useState(team.active_round);

  const [mappoolNMList, setMappoolNMList] = useState(mappools[activeStage].nm);
  const [mappoolHDList, setMappoolHDList] = useState(mappools[activeStage].hd);
  const [mappoolHRList, setMappoolHRList] = useState(mappools[activeStage].hr);
  const [mappoolDTList, setMappoolDTList] = useState(mappools[activeStage].dt);
  const [mappoolFMList, setMappoolFMList] = useState(mappools[activeStage].fm);
  const [mappoolTBList, setMappoolTBList] = useState(mappools[activeStage].tb);

  async function submitScore(UUID, index, player, map) {
    let newScores = await scores;
    if (newScores[player][map] === undefined) {
      newScores[player][map] = [];
    }
    newScores[player][map][index] = await value;

    const { data, err } = await supabase
      .from("teams")
      .update({
        scores: JSON.stringify({ scores: newScores }),
      })
      .eq("UUID", UUID);

    if (err) console.log(err);

    return;
  }

  useEffect(() => {
    if (playerChange !== "" && mapChange !== "") {
      const timeOutId = setTimeout(() => {
        console.log("before 1 second");
        return submitScore(team.UUID, indexToChange, playerChange, mapChange);
      }, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [value]);

  useEffect(() => {
    setMappoolNMList(mappools[activeStage].nm);
    setMappoolHDList(mappools[activeStage].hd);
    setMappoolHRList(mappools[activeStage].hr);
    setMappoolDTList(mappools[activeStage].dt);
    setMappoolFMList(mappools[activeStage].fm);
    setMappoolTBList(mappools[activeStage].tb);
  }, [activeStage]);

  function emptyScoresInput(index, player, map) {
    let scoreInput = {
      0: (
        <>
          <div className="score">
            <input
              type="number"
              placeholder="#1"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(0);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#2"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(1);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#3"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(2);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#4"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(3);
                setValue(e.target.value);
              }}
            />
          </div>
        </>
      ),
      1: (
        <>
          <div className="score">
            <input
              type="number"
              placeholder="#2"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(1);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#3"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(2);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#4"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(3);
                setValue(e.target.value);
              }}
            />
          </div>
        </>
      ),
      2: (
        <>
          <div className="score">
            <input
              type="number"
              placeholder="#3"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(2);
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="score">
            <input
              type="number"
              placeholder="#4"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(3);
                setValue(e.target.value);
              }}
            />
          </div>
        </>
      ),
      3: (
        <>
          <div className="score">
            <input
              type="number"
              placeholder="#4"
              defaultValue={""}
              readOnly={player === session.id ? false : true}
              onChange={(e) => {
                setMapChange(map);
                setPlayerChange(player);
                setIndexToChange(3);
                setValue(e.target.value);
              }}
            />
          </div>
        </>
      ),
      4: <></>,
    };
    return scoreInput[index];
  }

  const setInputColor = (value) => {
    let colorClass = "";
    if (0 < value < 250000 && value) {
      colorClass = "score-1";
    }
    if (value >= 250000) {
      colorClass = "score-2";
    }
    if (value >= 400000) {
      colorClass = "score-3";
    }
    if (value >= 500000) {
      colorClass = "score-4";
    }
    if (value >= 750000) {
      colorClass = "score-5";
    }
    if (value >= 900000) {
      colorClass = "score-6";
    }
    return colorClass;
  };

  return (
    <>
      <div className="teamOverview">
        <div className="teamOverview_Info">
          <img src={team.image} alt="team image" />
          <div className="teamOverview_Info_Name">{team.name}</div>
          <div className="teamOverview_Info_Tournament">{team.tournament}</div>
        </div>
        <div className="teamOverview_Members">
          <div className="teamOverview_Members_List">
            {players.map((player, index) => {
              return (
                <div className={`item ${player.status}`} key={index}>
                  <img
                    src={`http://s.ppy.sh/a/${player.id}`}
                    alt="player image"
                  />
                  <div className="teamOverview_Members_List_Item_Name">
                    {player.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Tabs className="teamTabs">
        <TabList className="teamTabsBar">
          <Tab className="teamTabsBarItem">{activeStage}</Tab>
          <Tab className="teamTabsBarItem">Availability</Tab>
          <Tab className="teamTabsBarItem">Players</Tab>
          <Tab className="teamTabsBarItem">Mappool</Tab>
        </TabList>
        <div className="teamTabsContent">
          <TabPanel className="scoresTab">
            <div className="mappool">
              <div className="header">Mappool</div>
              {mappoolNMList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item nm" key={index}>
                      <div className="image">
                        <div className="mod nm">NM{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolHDList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item hd" key={index}>
                      <div className="image">
                        <div className="mod hd">HD{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolHRList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item hr" key={index}>
                      <div className="image">
                        <div className="mod hr">HR{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolDTList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item dt" key={index}>
                      <div className="image">
                        <div className="mod dt">DT{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolFMList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item fm" key={index}>
                      <div className="image">
                        <div className="mod fm">FM{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolTBList.map((map, index) => {
                if (map != undefined || map != null) {
                  let minutes = Math.floor(map.total_length / 60);
                  let seconds = map.total_length % 60;

                  return (
                    <div className="item tb" key={index}>
                      <div className="image">
                        <div className="mod tb">TB{index + 1}</div>
                        <img
                          src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                          alt="beatmap image"
                        />
                      </div>
                      <div className="info">
                        <div className="song">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="creator">
                          mapped by {map.mapper_username}
                        </div>
                        <div className="stats">
                          <div className="length">
                            <Timer1 variant="Bold" size="12" color="#d9e3f0" />
                            {minutes}:{seconds}
                          </div>
                          <div className="bpm">
                            <span>BPM:</span> {map.bpm}
                          </div>
                          <div className="cs">
                            <span>CS:</span> {map.cs}
                          </div>
                          <div className="hp">
                            <span>HP:</span> {map.hp}
                          </div>
                          <div className="od">
                            <span>OD:</span> {map.od}
                          </div>
                          <div className="ar">
                            <span>AR:</span> {map.ar}
                          </div>
                          <div className="stars">
                            <Star1 variant="Bold" size="12" color="#D9E3F0" />{" "}
                            {map.star_rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="players">
              {players.map((player, index) => {
                return (
                  <div className="player" key={index}>
                    <div className="header">{player.name}</div>
                    {/* NOMOD SCORES */}
                    {mappoolNMList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              score !== "" && (scoreSum += parseInt(score));
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className={`item nm`} key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id === session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* HD SCORES */}
                    {mappoolHDList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              scoreSum += parseInt(score);
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className="item hd" key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id == session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* HR SCORES */}
                    {mappoolHRList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              scoreSum += parseInt(score);
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className="item hr" key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id == session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* DT SCORES */}
                    {mappoolDTList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              scoreSum += parseInt(score);
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className="item dt" key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id == session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* FM SCORES */}
                    {mappoolFMList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              scoreSum += parseInt(score);
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className="item fm" key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id == session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* TB SCORES */}
                    {mappoolTBList.map((map, index) => {
                      if (map != undefined || map != null) {
                        var average = 0;

                        if (scores[`${player.id}`][`${map.beatmap_id}`]) {
                          let scoreSum = 0;

                          scores[`${player.id}`][`${map.beatmap_id}`].map(
                            (score, index) => {
                              scoreSum += parseInt(score);
                            }
                          );

                          average =
                            scoreSum /
                            scores[`${player.id}`][`${map.beatmap_id}`].length;
                        }

                        return (
                          <div className="item tb" key={index}>
                            <div className="average">
                              <input
                                className={`${setInputColor(
                                  Math.round(average)
                                )}`}
                                type="text"
                                placeholder="Average"
                                value={Math.round(average)}
                                readOnly
                              />
                            </div>
                            <div className="scores">
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                                undefined &&
                                scores[`${player.id}`][`${map.beatmap_id}`].map(
                                  (score, index) => {
                                    return (
                                      <div className="score" key={index}>
                                        <input
                                          className={`${setInputColor(score)}`}
                                          type="number"
                                          placeholder={`#${index + 1}`}
                                          defaultValue={score}
                                          readOnly={
                                            player.id === session.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMapChange(map.beatmap_id);
                                            setPlayerChange(player.id);
                                            setIndexToChange(index);
                                            setValue(e.target.value);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              {scores[`${player.id}`][`${map.beatmap_id}`] !==
                              undefined
                                ? emptyScoresInput(
                                    scores[`${player.id}`][`${map.beatmap_id}`]
                                      .length,
                                    player.id,
                                    map.beatmap_id
                                  )
                                : emptyScoresInput(
                                    0,
                                    player.id,
                                    map.beatmap_id
                                  )}
                            </div>
                            <div
                              className={`vote ${
                                player.id == session.id ? "me" : ""
                              }`}
                            >
                              {player.id == session.id && (
                                <button id="scoreSubmit">
                                  <ImportCircle
                                    size="18"
                                    color="var(--team-mappool-input-placeholder-color)"
                                  />
                                </button>
                              )}
                              <input type="text" placeholder="Vote" />
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel className="availabilityTab"></TabPanel>
          <TabPanel className="playersTab"></TabPanel>
          <TabPanel className="mappoolTab">
            <AddMap
              token={token}
              teamID={teamID}
              activeStage={activeStage}
              setActiveStage={setActiveStage}
              mappools={mappools}
              NMList={mappoolNMList}
              setNMList={setMappoolNMList}
              HDList={mappoolHDList}
              setHDList={setMappoolHDList}
              HRList={mappoolHRList}
              setHRList={setMappoolHRList}
              DTList={mappoolDTList}
              setDTList={setMappoolDTList}
              FMList={mappoolFMList}
              setFMList={setMappoolFMList}
              TBList={mappoolTBList}
              setTBList={setMappoolTBList}
            />
            <div className="mapsList">
              {mappoolNMList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item nm" key={index}>
                      <div className="mod nm">NM{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolHDList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item hd" key={index}>
                      <div className="mod hd">HD{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolHRList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item hr" key={index}>
                      <div className="mod hr">HR{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolDTList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item dt" key={index}>
                      <div className="mod dt">DT{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolFMList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item fm" key={index}>
                      <div className="mod fm">FM{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {mappoolTBList.map((map, index) => {
                if (map != undefined || map != null) {
                  return (
                    <div className="item tb" key={index}>
                      <div className="mod tb">TB{index + 1}</div>
                      <img
                        src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`}
                        alt="beatmap image"
                      />
                      <div className="info">
                        <div className="title">
                          {map.artist} - {map.title} [{map.version}]
                        </div>
                        <div className="mapper">
                          mapped by {map.mapper_username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);

  const token = session !== null ? session.access_token : [{}];

  const id = session !== null ? context.params.id : [{}];
  const teamData =
    session !== null
      ? await (
          await supabase
            .from("teams")
            .select(
              "UUID,image,name,tournament,players,mappools,scores,active_round"
            )
            .eq("UUID", id)
        ).data[0]
      : [{}];

  let playersArray =
    session !== null ? await JSON.parse(teamData.players).players : [{}];

  let newPlayers = await playersArray.map((player, index) => {
    return {
      id: player.id,
      name: player.name,
      status: player.status === true ? "captain" : "",
    };
  });

  let newMappools =
    session !== null ? await JSON.parse(teamData.mappools) : [{}];

  let newScores =
    session !== null ? await JSON.parse(teamData.scores).scores : [{}];

  const returnProps =
    session === null ||
    teamData.id === null ||
    newPlayers.find((value) => value.id === session.id) === undefined
      ? {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      : {
          props: {
            session: session,
            token: token,
            team: teamData,
            players: newPlayers,
            mappools: newMappools,
            scores: newScores,
            teamID: context.params.id,
          },
        };

  return { ...returnProps };
}
