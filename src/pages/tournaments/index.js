
export default function Tournaments({ tournaments }) {
    return (
      <div className="homeContent">
          <div className="tournamentsContainer">
                <span id="header">Tournaments</span> <br />
                <span id="text">Currently {tournaments.length} tournaments supported!</span>
                <div className="tournamentsList">
                    {tournaments.map((item, index) => {
                        return(
                            <div className="entry" key={index} onClick={() => window.open(item.Link, "_blank")}>
                                <span className="acronym">{item.Acronym}</span>
                                <span className="name">{item.Name}</span>
                                <span className={`status ${item.Class}`}><span>{item.Status}</span></span>
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

        item.Link = (item.forumID.length < 15) ? `https://osu.ppy.sh/community/forums/topics/${item.forumID}` : item.forumID

        return item

    })
    
  
    return {
      props: {
        tournaments: data
      },
    };
}