import Airtable from "airtable";
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {

        if(req.query.nid) {

            base('Notifications').update([
                {
                  "id": req.query.nid,
                  "fields": {
                    "Status": 3
                  }
                }
              ], function(err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
                
                res.json({status: "success"})
              });

            return;
        }


    }

}


