import Airtable from "airtable";
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'POST') {

        if(req.query.t){
            base('Teams').select({
                filterByFormula: `{UUID} = "${req.query.t}"`,
                maxRecords: 1,
                view: "Grid view"
            }).eachPage(async function page(records, fetchNextPage) {

                let mappoolsField = await records[0].fields.Mappools
                mappoolsField = await JSON.parse(mappoolsField)

                mappoolsField[req.body.stage][req.body.mods[0]][req.body.mods[1]-1] = await req.body;

                base('Teams').update([
                    {
                      "id": records[0].id,
                      "fields": {
                        "Mappools": JSON.stringify(mappoolsField)
                      }
                    }
                  ], function(err, records) {
                    if (err) {
                      console.error(err);
                      return;
                    }

                  });

                        res.json({
                            status: 'success'
                        })
                  

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


