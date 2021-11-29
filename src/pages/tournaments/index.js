import { Chainlink, Link1 } from "iconsax-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Tournaments({ tournaments, requests }) {

    const [isTournamentOpen, setIsTournamentOpen] = useState([]);


    return (
      <div className="homeContent">
          <div className="tournamentsContainer">
                <span id="header">Tournaments</span><br/>
                <span id="text">Currently {tournaments.length} tournaments supported!</span>
                { (requests.length > 0) && <><br/><span id="subtext_requests">The accepted tournaments will be added every friday!</span></> }
                <div className="tournamentsList">
                    {
                        (requests.length > 0) &&
                            requests.map((item, index) => {
                                return(
                                    <div className="entry" key={index} onClick={() => window.open(item.forumID, "_blank")}>
                                        <span className="acronym">{item.Acronym}</span>
                                            <span className="name">{item.Name}<span className="request">Requested by <img src={`http://s.ppy.sh/a/${item.RequesterID}`} className="propic" alt="propic user"/><span className="username">{item.RequesterUsername}</span></span></span>
                                            <span className={`status ${item.Status}`}><span>{item.Status}</span>
                                        </span>
                                    </div>
                                )
                            }) 
                    }
                </div>
                {requests.length > 0 && <div className="tournamentsListDivider"/>}
                <div className="tournamentsList">
                    {tournaments.map((item, index) => {
                        return(
                            <div className="entry" key={index} onClick={() => { (isTournamentOpen[0] == index && isTournamentOpen[1] == true) ? setIsTournamentOpen([0, false]) : setIsTournamentOpen([index, true]) }}>
                                <span className="acronym">{item.Acronym}</span>
                                <span className="name">{item.Name}</span>
                                <span className={`status ${item.Class}`}><span>{item.Status}</span></span>
                                {(isTournamentOpen[0] == index && isTournamentOpen[1] == true) && 
                                <motion.div className="info"
                                    initial={{ opacity: 0, y: -5, display: "none", height: 0}}
                                    animate={{ opacity: 1, y: 0, display: "flex", height: "auto"}}
                                    exit={{ opacity: 0, y: -5, display: "none", height: 0}}
                                >
                                    {
                                        item.Stages.stages[0] && 
                                        <div className="progressbar-container">
                                            <ol className="progress-bar">
                                                {item.Stages.stages.map((stage, index) => {
                                                    return(
                                                        <li key={index} className={item.StagesStatus[index]}><span>{stage.stage}</span></li>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    }
                                    <br />
                                    <div className="about">
                                        {item.forumID && <div className="forum" onClick={() => window.open(`https://osu.ppy.sh/community/forums/topics/${item.forumID}`, "_blank")} ><Chainlink size="16" style={{marginTop: '2px'}} color="hsla(219, 40%, 60%, 1)"/> Forum Thread</div>}
                                        {item.Website && <div className="website" onClick={() => window.open(item.Website, "_blank")} ><Link1 size="16" style={{marginTop: '2px'}} color="hsla(219, 40%, 60%, 1)"/> Website</div>}
                                    </div>
                                </motion.div>}
                            </div>
                        )
                    })}
                    
                </div>
          </div>
      </div>
    );
}

export async function getServerSideProps() {
  
    var data = await fetch(`${process.env.NEXTAUTH_URL}/api/tournaments`)
    data = await data.json()

    data = data.map((item) => {
        let todayDate = new Date();
        let tournamentStartDate = new Date(item.Tourney_Start)
        let tournamentEndDate = new Date(item.Tourney_End)

        if(todayDate > tournamentStartDate && todayDate < tournamentEndDate){
            item.Status = 'Active'
            item.Class = 'Active'
        } else if(tournamentEndDate < todayDate){
            item.Status = 'Ended'
            item.Class = 'Ended'
        } else if(todayDate < tournamentStartDate){
            var Difference_In_Time = tournamentStartDate - todayDate;
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            item.Status = (Math.floor(Difference_In_Days) == 0) ? 'Tomorrow' : `${Math.floor(Difference_In_Days)} days`
            item.Class = 'Active'
        }

        item.Stages = JSON.parse(item.Stages)

        var prevDate = todayDate - 86400000;
        var stageStatus = []

        item.Stages.stages.forEach(el => {
            let stageDate = new Date(el.date)
            if(prevDate === null) prevDate = stageDate
            if(todayDate > stageDate && todayDate > prevDate){
                stageStatus.push("is-complete")
            } else if(todayDate <= stageDate && todayDate > prevDate){
                stageStatus.push("is-active")
            } else if(todayDate > prevDate && todayDate < stageDate){
                stageStatus.push("")
            }
            prevDate = stageDate
        });

        item.StagesStatus = stageStatus

        return item

    })

    var requests = await fetch(`${process.env.NEXTAUTH_URL}/api/tournaments/requests`)
    requests = await requests.json()

    return {
      props: {
        tournaments: data,
        requests: requests
      },
    };
}