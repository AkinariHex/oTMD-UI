import { getSession } from "next-auth/client";
import TournamentRequest from "../../components/Forms/TournamentRequest";
import { useState } from "react";
import Modal from 'react-modal';

export default function Account({ session, userStatus }) {

  let statusColor = {
    "Server": 'rgb(197, 56, 56);',
    "Tourney Manager": 'rgb(48, 164, 226);',
    "Tournaments Host": 'rgb(226, 168, 48);',
    "User": 'rgb(20,20,20);'
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

  /* Modal.setAppElement('#modal');

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  } */

  return (
    <div className="homeContent">

      {/* <div id="modal" className="modal hidden"></div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        
            <div className="content">
                <div className="header">
                    <span id="text">tournament request //</span>
                    <div className="icon" onClick={closeModal}><i className='bx bx-x'></i></div>
                </div>
            </div>
        
      </Modal> */}

      <div className="accountContainer">
        <div className="profileInfo">
          <img src="http://s.ppy.sh/a/4001304" alt="User Image" />
          <div className="profileName">Akinari<span style={{backgroundColor: statusColor[userStatus.Permissions]}} id="role">{userStatus.Permissions}</span></div>
          <div className="timeProfile">Joined from {DateDiff.inDays(joinDate, nowDate)} days</div>
        </div>
        <div className="profileActions">
          <div className="actionsContainer" style={{display: "flex"}}>
            <span style={{margin: "auto", color: "#EEE", fontFamily: "Poppins", fontSize: "20pt"}}>Coming Soon</span>
            {/* <div className="actionCategory">
              <h2>Tournaments Management</h2>
              <div className="actionCentre">
                <div className="action">
                  <div className="text">Manage tournament requests</div>
                  <div className="utilityIcon"><i className='bx bxs-down-arrow' ></i></div>
                </div>
              </div>
            </div>
            <div className="actionCategory">
              <h2>Tournaments</h2>
              <div className="actionCentre">
                <div className="action">
                  <div className="text">Your tournament requests</div>
                  <div className="utilityIcon"><i className='bx bxs-down-arrow' ></i></div>
                </div>
                <div className="action" onClick={openModal}>
                  <div className="text">Request a tournament</div>
                  <div className="utilityIcon"><i className='bx bxs-right-arrow' ></i></div>
                </div>
              </div>
            </div> */}
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
          },
        };

  return { ...returnProps };
}
