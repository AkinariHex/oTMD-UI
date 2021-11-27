import Airtable from "airtable";
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {

        if(req.query.u && req.query.status) {
            base('Notifications').select({
                filterByFormula: `AND({Receiver} = "${req.query.u}", {Status} = "${req.query.status}")`,
                sort: [{field: "Timestamp", direction: "desc"}],
                view: "Grid view"
            }).eachPage(async function page(records, fetchNextPage) {
                
                var mapped = await records.map((record) => {
                    let content = JSON.parse(record.fields.Content)
                    let sender = JSON.parse(record.fields.Sender)

                    let data = {
                        record_id: record.id,
                        type: record.fields.Type,
                        sender: { userid: sender.userid, username: sender.username },
                        content: content,
                        timestamp: record.fields.Timestamp
                    }

                    return data;

                })


                        
                res.json(mapped)
                  


                    
            }, function done(err) {
                if (err) {
                    console.error(err);
                }
                res.json({id: null})
            });
            return;
        }


    }

}


