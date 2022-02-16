import { getSession } from "next-auth/client";
import Airtable from "airtable";
const generateApiKey = require("generate-api-key");

/* Random string to generate a different key */
const randomString = (length = 32) => {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:<>?,./";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

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
            let { ID, UUID, RecordID } = records[0].fields;

            let newAPI = generateApiKey({
              method: "uuidv5",
              name: randomString(),
              namespace: UUID,
              prefix: ID,
            });

            base("Users").update(
              [
                {
                  id: RecordID,
                  fields: {
                    Apikey: newAPI,
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

            res.status(200).json({ status: "success", apikey: newAPI });
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
