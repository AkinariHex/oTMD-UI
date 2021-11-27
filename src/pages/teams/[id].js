import { getSession } from "next-auth/client";
import { Star1, Timer1, ImportCircle } from "iconsax-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddMap from "../../components/Forms/AddMap";
import { useState } from "react";


export default function Team({ session, token, team, players, mappools, scores, teamID }) {

    const [mappoolNMList, setMappoolNMList] = useState(mappools.qualifiers.nm);
    const [mappoolHDList, setMappoolHDList] = useState(mappools.qualifiers.hd);
    const [mappoolHRList, setMappoolHRList] = useState(mappools.qualifiers.hr);
    const [mappoolDTList, setMappoolDTList] = useState(mappools.qualifiers.dt);
    const [mappoolFMList, setMappoolFMList] = useState(mappools.qualifiers.fm);
    const [mappoolTBList, setMappoolTBList] = useState(mappools.qualifiers.tb);


    let scoreInput = {
        0: <><div className="score"><input type="text" placeholder="#1" readOnly/></div><div className="score"><input type="text" placeholder="#2" readOnly/></div><div className="score"><input type="text" placeholder="#3" readOnly/></div><div className="score"><input type="text" placeholder="#4" readOnly/></div></>,
        1: <><div className="score"><input type="text" placeholder="#2" readOnly/></div><div className="score"><input type="text" placeholder="#3" readOnly/></div><div className="score"><input type="text" placeholder="#4" readOnly/></div></>,
        2: <><div className="score"><input type="text" placeholder="#3" readOnly/></div><div className="score"><input type="text" placeholder="#4" readOnly/></div></>,
        3: <><div className="score"><input type="text" placeholder="#4" readOnly/></div></>,
        4: <></>
    }

    return (
        <>
            <div className="teamOverview">
                <div className="teamOverview_Info">
                    <img src={team.Image} alt="team image"/>
                    <div className="teamOverview_Info_Name">{team.Name}</div>
                    <div className="teamOverview_Info_Tournament">{team.Tournament}</div>
                </div>
                <div className="teamOverview_Members">
                    <div className="teamOverview_Members_List">
                        {players.map((player, index) => {
                                return(
                                    <div className={`item ${player.status}`} key={index}>
                                        <img src={`http://s.ppy.sh/a/${player.id}`} alt="player image"/>
                                        <div className="teamOverview_Members_List_Item_Name">{player.name}</div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
            <Tabs className="teamTabs">
                <TabList className="teamTabsBar">
                    <Tab className="teamTabsBarItem">Qualifiers</Tab>
                    <Tab className="teamTabsBarItem">Availability</Tab>
                    <Tab className="teamTabsBarItem">Players</Tab>
                    <Tab className="teamTabsBarItem">Mappool</Tab>
                </TabList>
                <div className="teamTabsContent">
                    <TabPanel className="scoresTab">
                        <div className="mappool">
                            <div className="header">Mappool</div>
                            {
                                mappools.qualifiers.nm.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;

                                        return(
                                            <div className="item nm" key={index}>
                                                <div className="image">
                                                    <div className="mod nm">NM{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappools.qualifiers.hd.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;

                                        return(
                                            <div className="item hd" key={index}>
                                                <div className="image">
                                                    <div className="mod hd">HD{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }   
                                })
                            }
                            {
                                mappools.qualifiers.hr.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;
                                        
                                        return(
                                            <div className="item hr" key={index}>
                                                <div className="image">
                                                    <div className="mod hr">HR{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappools.qualifiers.dt.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;

                                        return(
                                            <div className="item dt" key={index}>
                                                <div className="image">
                                                    <div className="mod dt">DT{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappools.qualifiers.fm.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;

                                        return(
                                            <div className="item fm" key={index}>
                                                <div className="image">
                                                    <div className="mod fm">FM{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappools.qualifiers.tb.map((map, index) => {
                                    if(map != undefined || map != null){

                                        let minutes = Math.floor(map.total_length/60);
                                        let seconds = map.total_length%60;

                                        return(
                                            <div className="item tb" key={index}>
                                                <div className="image">
                                                    <div className="mod tb">TB{index+1}</div>
                                                    <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                </div>
                                                <div className="info">
                                                    <div className="song">
                                                        {map.artist} - {map.title} [{map.version}]
                                                    </div>
                                                    <div className="creator">mapped by {map.mapper_username}</div>
                                                    <div className="stats">
                                                        <div className="length"><Timer1 variant="Bold" size="12" color="#d9e3f0"/>{minutes}:{seconds}</div>
                                                        <div className="bpm"><span>BPM:</span> {map.bpm}</div>
                                                        <div className="cs"><span>CS:</span> {map.cs}</div>
                                                        <div className="hp"><span>HP:</span> {map.hp}</div>
                                                        <div className="od"><span>OD:</span> {map.od}</div>
                                                        <div className="ar"><span>AR:</span> {map.ar}</div>
                                                        <div className="stars"><Star1 variant="Bold" size="12" color="#D9E3F0"/> {map.star_rating}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                        <div className="players">
                            {
                                players.map((player, index) => {
                                    return(
                                        <div className="player" key={index}>
                                            <div className="header">{player.name}</div>
                                            {/* NOMOD SCORES */}
                                            {
                                                mappools.qualifiers.nm.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className={`item nm`} key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                })
                                            }
                                            {/* HD SCORES */}
                                            {
                                                mappools.qualifiers.hd.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className="item hd" key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                })
                                            }
                                            {/* HR SCORES */}
                                            {
                                                mappools.qualifiers.hr.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className="item hr" key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                })
                                            }
                                            {/* DT SCORES */}
                                            {
                                                mappools.qualifiers.dt.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className="item dt" key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                })
                                            }
                                            {/* FM SCORES */}
                                            {
                                                mappools.qualifiers.fm.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className="item fm" key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                })
                                            }
                                            {/* TB SCORES */}
                                            {
                                                mappools.qualifiers.tb.map((map, index) => {

                                                if(map != undefined || map != null){

                                                    var average = 0;

                                                    if(scores[`${player.id}`][`${map.beatmap_id}`]){
                                                    
                                                        let scoreSum = 0;
    
                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                            scoreSum += parseInt(score);
                                                        })
    
                                                        average = scoreSum / scores[`${player.id}`][`${map.beatmap_id}`].length

                                                    }

                                                    return(
                                                        <div className="item tb" key={index}>
                                                            <div className="average"><input type="text" placeholder="Average" value={Math.round(average)} readOnly/></div>
                                                            <div className="scores">
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined && 
                                                                        scores[`${player.id}`][`${map.beatmap_id}`].map((score, index) => {
                                                                            return(
                                                                                <div className="score" key={index}><input type="text" placeholder={`#${index}`} value={score} readOnly/></div>
                                                                            )
                                                                        })
                                                                }
                                                                {
                                                                    scores[`${player.id}`][`${map.beatmap_id}`] !== undefined ? scoreInput[scores[`${player.id}`][`${map.beatmap_id}`].length] : scoreInput[0]
                                                                }
                                                                {/* <div className="score"><input type="text" placeholder="#1" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#2" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#3" readOnly/></div>
                                                                <div className="score"><input type="text" placeholder="#4" readOnly/></div> */}
                                                            </div>
                                                            <div className={`vote ${((player.id == session.id) ? "me" : '')}`}>
                                                                {
                                                                    (player.id == session.id) && <button id="scoreSubmit"><ImportCircle size="18" color="var(--team-mappool-input-placeholder-color)"/></button>
                                                                }
                                                                <input type="text" placeholder="Vote" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </TabPanel>
                    <TabPanel className="availabilityTab"></TabPanel>
                    <TabPanel className="playersTab"></TabPanel>
                    <TabPanel className="mappoolTab">
                        <AddMap token={token} teamID={teamID} NMList={mappoolNMList} setNMList={setMappoolNMList} HDList={mappoolHDList} setHDList={setMappoolHDList} HRList={mappoolHRList} setHRList={setMappoolHRList} DTList={mappoolDTList} setDTList={setMappoolDTList} FMList={mappoolFMList} setFMList={setMappoolFMList} TBList={mappoolTBList} setTBList={setMappoolTBList}/>
                        <div className="mapsList">
                            {
                                mappoolNMList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item nm" key={index}>
                                                <div className="mod nm">NM{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappoolHDList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item hd" key={index}>
                                                <div className="mod hd">HD{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappoolHRList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item hr" key={index}>
                                                <div className="mod hr">HR{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappoolDTList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item dt" key={index}>
                                                <div className="mod dt">DT{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappoolFMList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item fm" key={index}>
                                                <div className="mod fm">FM{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                mappoolTBList.map((map, index) => {
                                    if(map != undefined || map != null){
                                        return (
                                            <div className="item tb" key={index}>
                                                <div className="mod tb">TB{index+1}</div>
                                                <img src={`https://b.ppy.sh/thumb/${map.beatmapset_id}l.jpg`} alt="beatmap image" />
                                                <div className="info">
                                                    <div className="title">{map.artist} - {map.title} [{map.version}]</div>
                                                    <div className="mapper">mapped by {map.mapper_username}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
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
  
    const statusData =
      session !== null
        ? await fetch(
            `${process.env.NEXTAUTH_URL}/api/users?u=${session.id}`
          ).then((res) => res.json()).then(res => res[0])
        : [{}];
  
    const id = session !== null ? context.params.id : [{}];
    const teamData = 
        session !== null
            ? await fetch(`${process.env.NEXTAUTH_URL}/api/teams?t=${id}`).
                then((res) => res.json())
            : [{}];


    let playersArray = session !== null ? await JSON.parse(teamData.fields.Players).players : [{}];

    let newPlayers = await playersArray.map((player, index) => {
        return {
            id: player.id,
            name: player.name,
            status: player.status === true ? 'captain' : ''
        }
    })

    let newMappools = session !== null ? await JSON.parse(teamData.fields.Mappools) : [{}];

    let newScores = session !== null ? await JSON.parse(teamData.fields.Scores).scores : [{}];

    const returnProps =
      (session === null || teamData.id === null)
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
              userStatus: statusData,
              team: teamData.fields,
              players: newPlayers,
              mappools: newMappools,
              scores: newScores,
              teamID: context.params.id
            },
          };
  
    return { ...returnProps };
  }