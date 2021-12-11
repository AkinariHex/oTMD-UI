import Airtable from "airtable";
import Cors from "cors";

const cors = Cors({
    methods: ['POST'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function handler(req, res) {
    await runMiddleware(req, res, cors)
    const base = new Airtable({apiKey: process.env.AIRTABLE_APIKEY}).base(process.env.AIRTABLE_BASE)

    if (req.method === 'GET') {

        if(req.query.t){
            base('Tournaments').select({
                filterByFormula: `IF({Acronym} = '${req.query.t}' , TRUE())`,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                
                let tournamentName = records[0].fields.Name
                let multipliers = JSON.parse(records[0].fields.Multipliers)
            
                return res.status(200).json({ tournamentName, multipliers})
            
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }
        
    }
  }