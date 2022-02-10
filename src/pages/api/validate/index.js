import Airtable from "airtable";
import Cors from "cors";

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
    process.env.AIRTABLE_BASE
  );

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    base("Users")
      .select({
        filterByFormula: `IF({Apikey} = '${body.webapikey}' , TRUE())`,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records.length > 0) {
            return res.status(200).json({ user: records[0].get("ID") });
          } else {
            return res.status(404).json({ error: "Wrong apikey!" });
          }
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
          res.end();
        }
      );
  }
}
