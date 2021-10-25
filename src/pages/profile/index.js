import { getSession } from "next-auth/client";
import TournamentRequest from "../../components/Forms/TournamentRequest";
import { useState } from "react";
import Collapsible from "react-collapsible";

export default function Account({ session, userStatus, requests }) {

  let statusColor = {
    "Server": 'rgb(197, 56, 56)',
    "Tourney Manager": 'rgb(48, 164, 226)',
    "Tournaments Host": 'rgb(226, 168, 48)',
    "User": 'rgb(20,20,20)'
  }

  let joinDate = new Date(userStatus.DateJoin*1000);
  let nowDate = new Date()
  var DateDiff = {

    inDays: function(d1, d2) {
        return parseInt((d2-d1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        return parseInt((d2-d1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

  const [tournamentList, setTournamentList] = useState(['action','down'])
  const [tournamentForm, setTournamentForm] = useState(['action','down'])


  return (
    <div className="homeContent">

      <div className="accountContainer">
        <div className="profileInfo">
          <div className="userMain">
            <img src={session.avatar_url} alt="User Image" />
            <div className="profileName">{session.username}<span style={{backgroundColor: statusColor[userStatus.Permissions]}} id="role">{userStatus.Permissions}</span></div>
            <div className="timeProfile">Joined from {DateDiff.inDays(joinDate, nowDate)} days</div>
          </div>
          <div className="userSocial">
            { (userStatus.Twitter) && <div id="twitter"><i className='bx bxl-twitter'></i>{userStatus.Twitter}</div>}
            { (userStatus.Discord) && <div id="discord"><i className='bx bxl-discord-alt' ></i>{userStatus.Discord}</div>}
          </div>
        </div>
        <div className="profileActions">
          <div className="actionsContainer">
            {
              (userStatus.Permissions === 'Server' || userStatus.Permissions === 'Tourney Manager') &&
              <div className="actionCategory">
                <h2>Tournaments Management</h2>
                <div className="actionCentre">
                  <div className="action">
                    <div className="text">Manage tournament requests</div>
                    <div className="utilityIcon"><i className='bx bxs-down-arrow' ></i></div>
                  </div>
                </div>
              </div>
            }
            <div className="actionCategory">
              <h2>Tournaments</h2>
              <div className="actionCentre">
                <Collapsible onTriggerOpening={() => {setTournamentList(['actionOpen','up'])}} onTriggerClosing={() => {setTournamentList(['action','down'])}} transitionTime="200" easing="ease-out" trigger={<div className={tournamentList[0]}><div className="tn"><div className="text">Your tournament requests</div>{requests.length > 0 && <div className="number">{requests.length}</div>}</div><div className="utilityIcon"><i className={`bx bxs-${tournamentList[1]}-arrow`} ></i></div></div>}>
                  <div className="collapsibleBody">
                    {
                      (requests.length > 0) &&
                      requests.map((item, index) => {
                          return(
                              <div className="item" key={index} onClick={() => window.open(item.forumID, "_blank")}>
                                  <div className="text">
                                    <div id="acronym">{item.Acronym}</div>
                                    <div id="name">{item.Name}</div>
                                  </div>
                                  <span className={`status ${item.Status}`}><span>{item.Status}</span></span>
                              </div>
                          )
                      })
                    }
                    { 
                      (requests.length === 0) &&
                      <div id="noRequests">No requests</div>
                    }
                  </div>
                </Collapsible>
                <Collapsible onTriggerOpening={() => {setTournamentForm(['actionOpen','up'])}} onTriggerClosing={() => {setTournamentForm(['action','down'])}} transitionTime="200" easing="ease-out" trigger={<div className={tournamentForm[0]}><div className="text">Request a tournament</div><div className="utilityIcon"><i className={`bx bxs-${tournamentForm[1]}-arrow`} ></i></div></div>}>
                  <TournamentRequest profile={userStatus} session={session}/>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);

  const statusData =
    session !== null
      ? await fetch(
          `${process.env.NEXTAUTH_URL}/api/users?u=${session.id}`
        ).then((res) => res.json()).then(res => res[0])
      : [{}];

  var requests = 
    session !== null
      ? await fetch(`${process.env.NEXTAUTH_URL}/api/tournaments?u=${session.id}`)
      .then((res) => res.json())
      : [{}];

  const returnProps =
    session === null
      ? {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      : {
          props: {
            session: session,
            userStatus: statusData,
            requests: requests
          },
        };

  return { ...returnProps };
}
