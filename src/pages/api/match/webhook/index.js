import { getSession } from "next-auth/client";
import Airtable from "airtable";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "GET" && req.query.v) {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
        process.env.AIRTABLE_BASE
      );
      base("Users")
        .select({
          filterByFormula: `IF({ID} = '${session.id}' , TRUE())`,
          view: "Grid view",
        })
        .eachPage(
          function page(records, fetchNextPage) {
            if (records.length > 0) {
              let recordid = records[0].getId();
              base("Users").update(
                [
                  {
                    id: recordid,
                    fields: {
                      SendMatchesDiscord: req.query.v.toString(),
                    },
                  },
                ],
                function (err, records) {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ status: "error" });
                  } else {
                    return res.status(200).json({ status: "success" });
                  }
                }
              );
            } else {
              res.status(404).json({
                error: "User not found",
              });
            }
          },
          function done(err) {
            if (err) {
              console.error(err);
              return res.status(401);
            }
          }
        );
    }
  }
}
