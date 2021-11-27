import Airtable from "airtable";
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'POST') {

        req.body = JSON.parse(req.body);

        if(req.body.notification_id && req.body.team_id && req.body.user_id && req.body.username) {

            base('Notifications').update([
                {
                  "id": req.body.notification_id,
                  "fields": {
                    "Status": 2
                  }
                }
              ], function(err, records) {
                if (err) {
                  console.error(err);
                  return;
                }

                base('Teams').select({
                    filterByFormula: `{UUID} = "${req.body.team_id}"`,
                    view: "Grid view"
                }).eachPage(async function page(records, fetchNextPage) {
                    
                    let rid = records[0].id
                    let playersField = JSON.parse(records[0].fields.Players)

                    playersField.players.push({"id": req.body.user_id, "name": req.body.username})
    
                    base('Teams').update([
                        {
                            "id": rid,
                            "fields": {
                              "Players": JSON.stringify(playersField)
                            }
                        }
                    ], function(err, records) {
                        if (err) {
                          console.error(err);
                          return;
                        }
                    })
                      
                        
                }, function done(err) {
                    if (err) {
                        console.error(err);
                    }
                });
                
                res.json({status: "success"})
              });

            return;
        }


    }

}


