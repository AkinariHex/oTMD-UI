import Airtable from "airtable";
import { getSession } from "next-auth/client"
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    /* if(session){ */

        if (req.method === 'POST') {

            if(req.body){
                //ESEMPIO PER IL BODY DA SUBMITTARE
                let body = {
                    "name": "",
                    "tournament": "",
                    "creator": "",
                    "type": "",
                    "country": ""
                }


                let encTeamName = encodeURI(req.body.name);

                let players = {"players":[]}

                let mappools = {
                    "qualifiers": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "ro32": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "ro16": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "quarterfinals": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "semifinals": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "finals": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    },
                    "grandfinals": {
                        "nm": [],
                        "hd": [],
                        "hr": [],
                        "dt": [],
                        "fm": [],
                        "tb": []
                    }
                } 

                let scores = {"scores":{}}

                let image = ''

                switch(req.body.type){
                    // NORMAL TEAM
                    case 0: {
                        image=`https://eu.ui-avatars.com/api/?background=random&name=${encTeamName}`
                        break;
                    }
                    case 1: {
                        image=`https://github.com/ppy/osu-resources/blob/master/osu.Game.Resources/Textures/Flags/${req.body.country}.png?raw=true`
                        break;
                    }
                }

                base('Teams').create([
                    {
                      "fields": {
                        "UUID": uuidv4(),
                        "Name": req.body.name,
                        "Tournament": req.body.tournament,
                        "Creator": req.body.creator,
                        "Type": req.body.type,
                        "Image": image,
                        "Players": JSON.stringify(players),
                        "Mappools": JSON.stringify(mappools),
                        "Scores": JSON.stringify(scores)
                      }
                    }
                  ], function(err, records) {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    res.json({status: "success"})
                  });
                
            }
    
    
        }

    }


/* } */


