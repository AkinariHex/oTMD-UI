import Airtable from "airtable";

export default function handler(req, res) {
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {
        
        if(Object.keys(req.query).length === 0){
            base('Tournaments').select({
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
    
                var mapped = records.map((record) => {return record.fields})
    
                mapped = mapped.sort((a, b) => {
                    let date1 = new Date(a.Tourney_End)
                    let date2 = new Date(b.Tourney_End)
    
                    return date2 - date1
                })
            
                res.status(200).send(mapped)
            
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }

        if(req.query.u){
            base(process.env.AIRTABLE_TOURNAMENTS_TABLE).select({
                filterByFormula: `IF({RequesterID} = '${req.query.u}' , TRUE())`,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
    
                var mapped = records.map((record) => {return record.fields})
            
                res.status(200).json(mapped)
            
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }
        
    }
  }