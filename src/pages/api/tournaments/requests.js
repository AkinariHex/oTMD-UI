import Airtable from "airtable";
import { getSession } from "next-auth/client"
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export default async function handler(req, res) {
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {
        base('TournamentsRequests').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            var mapped = records.map((record) => {return record.fields})
        
            res.status(200).send(mapped)
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
      
    }

    const session = await getSession({ req })
    if (req.method === 'POST') {
        if(req.query.s !== null) {
          if(session){
            if(!uuidValidateV4(req.query.s)) {
              return res.status(401).json({ status: 'uuid denied', uuid: uuidValidateV4(req.query.s)})
            };

            if(!req.body){
              return res.status(401).json({ status: 'no body', uuid: uuidValidateV4(req.query.s)})
            }

            base('TournamentsRequests').create([
              {
                "fields": {
                  "UUID": uuidv4(),
                  "Acronym": "",
                  "Name": req.body.tourneyName,
                  "forumID": req.body.tourneyURL,
                  "RequesterID": session.id,
                  "RequesterUsername": session.username,
                  "Status": "Pending",
                  "DateRequest": Math.floor(new Date().getTime()/1000.0)
                }
              }
            ], function(err, records) {
              if (err) {
                console.error(err);
                return;
              }
            });

            let jsonData = {
              "embeds": [
                  {
                    "author": {
                      "name": `Tournament Request`,
                      "url": `https://osu.ppy.sh/users/${session.id}`,
                      "icon_url": session.avatar_url
                    },
                    "color": 0x00FFFF,
                    "timestamp": new Date().toISOString(),
                    "fields": [
                      {
                        "name": "Tournament",
                        "value": req.body.tourneyName,
                        "inline": true
                      },
                      {
                        "name": "Link",
                        "value": `[Forum Post](${req.body.tourneyURL})`,
                        "inline": true
                      },
                      {
                        "name": "Request by",
                        "value": `[${session.username}](https://osu.ppy.sh/users/${session.id})`,
                        "inline": true
                      }
                    ]
                  }
                ]
            };

            fetch(process.env.DISCORD_WH, {
              method: "post",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
            })

            return res.status(200).json({status: 'tournament added'})
            
          } else {
            return res.status(401).json({status: 'access denied'})
          }
        } else {
          return res.status(401).json({status: 'access denied'})
        }
      }

  }