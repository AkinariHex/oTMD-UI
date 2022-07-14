import { getSession } from "next-auth/react";
import Airtable from "airtable";

export default async function handler(req, res) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
    process.env.AIRTABLE_BASE
  );

  if (req.method === "GET") {
    const session = await getSession({ req });

    if (session) {
      base("Users")
        .select({
          filterByFormula: `IF({ID} = '${session.id}' , TRUE())`,
          view: "Grid view",
        })
        .eachPage(
          function page(records, fetchNextPage) {
            let { RecordID } = records[0].fields;

            base("Users").update(
              [
                {
                  id: RecordID,
                  fields: {
                    Apikey: "",
                  },
                },
              ],
              function (err, records) {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ status: "error" });
                }
              }
            );

            res.status(200).json({ status: "success" });
          },
          function done(err) {
            if (err) {
              console.error(err);
              return res.status(401);
            }
          }
        );
    } else {
      res.status(401).json({ status: "No authorization" });
    }
  }
}
