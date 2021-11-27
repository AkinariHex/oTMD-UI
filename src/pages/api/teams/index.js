import Airtable from "airtable";
import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req });
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {

        if(req.query.t){
            base('Teams').select({
                filterByFormula: `{UUID} = "${req.query.t}"`,
                maxRecords: 1,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(async function(record) {

                        
                        res.json({
                            id: record.id,
                            fields: record.fields
                        })
                  


                    
                })
                fetchNextPage()
            }, function done(err) {
                if (err) {
                    console.error(err);
                }
                res.json({id: null})
            });
            return;
        }
        
        if(req.query.u && req.query.type == 0){

            base('Teams').select({
                filterByFormula: `{Creator} = "${req.query.u}"`,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                
                var mapped = records.map((record) => {return record.fields})
                        
                        res.json(mapped)
                  


                    
                        
                fetchNextPage()
            }, function done(err) {
                if (err) {
                    console.error(err);
                }
                res.json({id: null})
            });

            return;
        }

        if(req.query.u && req.query.type == 1){

            base('Teams').select({
                view: "Grid view"
            }).eachPage(async function page(records, fetchNextPage) {

                var mapped = [];
                
                await records.forEach(async (record) => {
                    
                    let listPlayers = await JSON.parse(record.fields.Players).players;

                    if(listPlayers.some(o => o.id == req.query.u) === true && record.fields.Creator != req.query.u) return mapped.push(record.fields);
                })
                        
                res.json(mapped)
       
                fetchNextPage()
            }, function done(err) {
                if (err) {
                    console.error(err);
                }
            });

            return;

        }


        base('Teams').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            var mapped = records.map((record) => {return record.fields.UUID})
        
            res.status(200).json(mapped)
        
        }, function done(err) {
            if (err) { console.error(err); return res.status(401); }
        });

    }

}


