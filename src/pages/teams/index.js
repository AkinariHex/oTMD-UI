import { getSession } from "next-auth/client";
import Link from "next/link";
import { Add } from "iconsax-react";
import CreateTeam from "../../components/Modals/createTeam";

export default function Teams({ userStatus, teamsDataCreated, teamsDataJoined }) {

    return (
        <div className="teamsContainer">
            <h1>My Teams</h1>
            <h2>Created Teams</h2>
            <div className="teamsList">
              {
                teamsDataCreated.map((team, index) => {
                  return (
                    <Link href={`/teams/${team.UUID}`} key={index} passHref>
                      <div className="item">
                        {
                          (team.Type === 0)
                            ? <img className="normal" src={team.Image} alt="team image" />
                            : <img className="national" src={team.Image} alt="team image" />
                        }      
                        <div className="item-name">{team.Name}</div>
                        <div className="item-tournament">{team.Tournament}</div>
                      </div>
                    </Link>
                  )
                })
              }
              <CreateTeam user={userStatus}/>
            </div>
            <h2>Joined Teams</h2>
            <div className="teamsList">
              {
                teamsDataJoined.map((team, index) => {
                  return (
                    <Link href={`/teams/${team.UUID}`} key={index}>
                      <div className="item">
                        {
                          (team.Type === 0)
                            ? <img className="normal" src={team.Image} alt="team image" />
                            : <img className="national" src={team.Image} alt="team image" />
                        }   
                        <div className="item-name">{team.Name}</div>
                        <div className="item-tournament">{team.Tournament}</div>
                      </div>
                    </Link>
                  )
                })
              }
              <div className="item join">
                <Add size="32" color="var(--team-mappool-input-placeholder-color)" /> Join Team
              </div>
            </div>
        </div>
    )
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
        
        const teamsDataCreated =
          session !== null
            ? await fetch(
                `${process.env.NEXTAUTH_URL}/api/teams?u=${session.id}&type=0`
              ).then((res) => res.json())
            : [{}];
            
            const teamsDataJoined =
              session !== null
                ? await fetch(
                    `${process.env.NEXTAUTH_URL}/api/teams?u=${session.id}&type=1`
                  ).then((res) => res.json())
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
              teamsDataCreated: teamsDataCreated,
              teamsDataJoined: teamsDataJoined
            },
          };
  
    return { ...returnProps };
  }
