import Airtable from "airtable";
import { getSession } from "next-auth/react"
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export default async function handler(req, res) {
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {

        if(req.query.u){

            base(process.env.AIRTABLE_TOURNAMENTS_MAIN_TABLE).select({
                filterByFormula: `IF({Host} = '${req.query.u}', TRUE())`,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {

                if(records.length === 0){
                    return res.status(200).send([])
                }
    
                var mapped = records.map((record) => {return record.fields})
            
                res.status(200).json(mapped)
            
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }
        
    }

    const session = await getSession({ req })
    if (req.method === 'POST') {
        if(req.query.s !== null && req.query.t !== null) {
            if(session){
                if(!uuidValidateV4(req.query.s)) {
                    return res.status(401).json({ status: 'uuid denied', uuid: uuidValidateV4(req.query.s)})
                  };
      
                  if(!req.body){
                    return res.status(401).json({ status: 'no body', uuid: uuidValidateV4(req.query.s)})
                  }

                  let multipliers = {
                    "NM": {
                        "type": (req.body?.NMstatus !== undefined) ? req.body?.NMstatus : "*",
                        "value": (req.body?.NMvalue !== undefined) ? req.body?.NMvalue : "1.00"
                    },
                    "HD": {
                        "type": (req.body?.HDstatus !== undefined) ? req.body?.HDstatus : "*",
                        "value": (req.body?.HDvalue !== undefined) ? req.body?.HDvalue : "1.00"
                    },
                    "HR": {
                        "type": (req.body?.HRstatus !== undefined) ? req.body?.HRstatus : "*",
                        "value": (req.body?.HRvalue !== undefined) ? req.body?.HRvalue : "1.00"
                    },
                    "DT": {
                        "type": (req.body?.DTstatus !== undefined) ? req.body?.DTstatus : "*",
                        "value": (req.body?.DTvalue !== undefined) ? req.body?.DTvalue : "1.00"
                    },
                    "EZ": {
                        "type": (req.body?.EZstatus !== undefined) ? req.body?.EZstatus : "*",
                        "value": (req.body?.EZvalue !== undefined) ? req.body?.EZvalue : "1.00"
                    },
                    "FL": {
                        "type": (req.body?.FLstatus !== undefined) ? req.body?.FLstatus : "*",
                        "value": (req.body?.FLvalue !== undefined) ? req.body?.FLvalue : "1.00"
                    },
                    "SD": {
                        "type": (req.body?.SDstatus !== undefined) ? req.body?.SDstatus : "*",
                        "value": (req.body?.SDvalue !== undefined) ? req.body?.SDvalue : "1.00",
                        "failValue": (req.body?.SDfailValue !== undefined) ? req.body?.SDfailValue : "1.00"
                    },
                    "HT": {
                        "type": (req.body?.HTstatus !== undefined) ? req.body?.HTstatus : "*",
                        "value": (req.body?.HTvalue !== undefined) ? req.body?.HTvalue : "1.00"
                    }
                }

                  base(process.env.AIRTABLE_TOURNAMENTS_MAIN_TABLE).update([
                    {
                      "id": req.query.t,
                      "fields": {
                        "Acronym": req.body.acronym,
                        "Name": req.body.tourneyName,
                        "forumID": req.body.forumID,
                        "Tourney_Start": req.body.startDate,
                        "Tourney_End": req.body.endDate,
                        "Website": req.body.website,
                        "Multipliers": JSON.stringify(multipliers),
                      }
                    }
                  ], function(err, records) {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    return res.status(200).json({status: 'tournament added'})
                  });
            } else {
                return res.status(401).json({status: 'access denied'})
            }
        } else {
            return res.status(401).json({status: 'access denied'})
        }
    }
  }