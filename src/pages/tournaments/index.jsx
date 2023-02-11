import { motion } from 'framer-motion';
import { Chainlink, Link1 } from 'iconsax-react';
import Image from 'next/image';
import { useState } from 'react';
import supabase from '../../config/supabaseClient';

export default function Tournaments({ tournaments, requests }) {
  const [isTournamentOpen, setIsTournamentOpen] = useState([]);

  return (
    <div className="homeContent">
      <div className="tournamentsContainer">
        <span id="header">Tournaments</span>
        <br />
        <span id="text">
          Currently {tournaments.length} tournaments supported!
        </span>
        {requests.length > 0 && (
          <>
            <br />
            <span id="subtext_requests">
              The accepted tournaments will be added every friday!
            </span>
          </>
        )}
        <div className="tournamentsList">
          {requests.length > 0 &&
            requests.map((item, index) => {
              return (
                <div
                  className="entry"
                  key={index}
                  onClick={() => window.open(item.forumID, '_blank')}
                >
                  <span className="acronym">{item.acronym}</span>
                  <span className="name">
                    {item.name}
                    <span className="request">
                      Requested by{' '}
                      <img
                        src={`http://s.ppy.sh/a/${item.requester.ID}`}
                        className="propic"
                        alt="propic user"
                      />
                      <span className="username">
                        {item.requester.username}
                      </span>
                    </span>
                  </span>
                  <span className={`status ${item.status}`}>
                    <span>{item.status}</span>
                  </span>
                </div>
              );
            })}
        </div>
        {requests.length > 0 && <div className="tournamentsListDivider" />}
        <div className="tournamentsList">
          {tournaments.map((item, index) => {
            return (
              <div
                className="entry"
                key={index}
                onClick={() => {
                  isTournamentOpen[0] == index && isTournamentOpen[1] == true
                    ? setIsTournamentOpen([0, false])
                    : setIsTournamentOpen([index, true]);
                }}
              >
                <span className="acronym">{item.acronym}</span>
                <span className="name">{item.name}</span>
                <span className={`status ${item.class}`}>
                  <span>{item.class}</span>
                </span>
                {isTournamentOpen[0] == index &&
                  isTournamentOpen[1] == true && (
                    <motion.div
                      className="info"
                      initial={{
                        opacity: 0,
                        y: -5,
                        display: 'none',
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        display: 'flex',
                        height: 'auto',
                      }}
                      exit={{ opacity: 0, y: -5, display: 'none', height: 0 }}
                    >
                      {item.stages.stages[0] && (
                        <div className="progressbar-container">
                          <ol className="progress-bar">
                            {item.stages.stages.map((stage, index) => {
                              return (
                                <li
                                  key={index}
                                  className={item.stagesStatus[index]}
                                >
                                  <span>{stage.stage}</span>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      )}
                      <br />
                      <div className="about">
                        {item.forumID && (
                          <div
                            className="forum"
                            onClick={() =>
                              window.open(
                                `https://osu.ppy.sh/community/forums/topics/${item.forumID}`,
                                '_blank'
                              )
                            }
                          >
                            <Chainlink
                              size="16"
                              style={{ marginTop: '2px' }}
                              color="hsla(219, 40%, 60%, 1)"
                            />{' '}
                            Forum Thread
                          </div>
                        )}
                        {item.website && (
                          <div
                            className="website"
                            onClick={() => window.open(item.Website, '_blank')}
                          >
                            <Link1
                              size="16"
                              style={{ marginTop: '2px' }}
                              color="hsla(219, 40%, 60%, 1)"
                            />{' '}
                            Website
                          </div>
                        )}
                        {item.pickem && (
                          <div
                            className="website"
                            onClick={() => window.open(item.Pickem, '_blank')}
                          >
                            <img
                              src="img/hwr-pickem-logo.png"
                              height={16}
                              width={16}
                              style={{
                                marginTop: '2px',
                                filter:
                                  'invert(51%) sepia(57%) saturate(305%) hue-rotate(180deg) brightness(96%) contrast(91%)',
                              }}
                              alt="pickem logo"
                            />{' '}
                            Pick&apos;em
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  var tournaments = await supabase
    .from(`${process.env.NEXT_PUBLIC_DB_TOURNAMENTS}`)
    .select(
      'UUID,acronym,name,forumID,website,pickem,stages,tourney_start,tourney_end,isActive'
    )
    .order('tourney_start', { ascending: false });
  tournaments = tournaments.data;

  tournaments = await tournaments.sort((a, b) => {
    let date1 = new Date(a.tourney_end);
    let date2 = new Date(b.tourney_end);

    return date2 - date1;
  });

  tournaments = await Promise.all(
    tournaments.map(async (item) => {
      let todayDate = new Date();
      let tournamentStartDate = new Date(item.tourney_start);
      let tournamentEndDate = new Date(item.tourney_end);

      if (todayDate > tournamentStartDate && todayDate < tournamentEndDate) {
        item.status = true;
        item.class = 'Active';
      } else if (tournamentEndDate < todayDate) {
        item.status = false;
        item.class = 'Ended';
      } else if (todayDate < tournamentStartDate) {
        var Difference_In_Time = tournamentStartDate - todayDate;
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        item.status =
          Math.floor(Difference_In_Days) == 0
            ? 'Tomorrow'
            : `${Math.floor(Difference_In_Days)} days`;
        item.class = 'Active';
      }

      if (item.isActive !== item.status) {
        await supabase
          .from(`${process.env.NEXT_PUBLIC_DB_TOURNAMENTS}`)
          .update({
            isActive: item.status,
          })
          .eq('UUID', item.UUID);
      }

      item.stages =
        typeof item.stages !== 'string' ? item.stages : JSON.parse(item.stages);

      var prevDate = todayDate - 86400000;
      var stageStatus = [];

      item.stages.stages.forEach((el) => {
        let stageDate = new Date(el.date);
        if (prevDate === null) prevDate = stageDate;
        if (todayDate > stageDate && todayDate > prevDate) {
          stageStatus.push('is-complete');
        } else if (todayDate <= stageDate && todayDate > prevDate) {
          stageStatus.push('is-active');
        } else if (todayDate > prevDate && todayDate < stageDate) {
          stageStatus.push('');
        }
        prevDate = stageDate;
      });

      item.stagesStatus = stageStatus;

      return item;
    })
  );

  var requests = await (
    await supabase
      .from(`${process.env.NEXT_PUBLIC_DB_TOURNEY_REQUESTS}`)
      .select('*, requester(ID,username)')
  ).data;

  return {
    props: {
      tournaments: tournaments,
      requests: requests,
    },
  };
}
