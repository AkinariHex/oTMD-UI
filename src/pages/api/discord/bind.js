import Cors from "cors";
import supabase from "../../../config/supabaseClient";

const cors = Cors({
  methods: ["GET"],
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

  if (req.method === "POST") {
    if (req.query.api && req.query.discordID) {
      const { data, err } = await supabase
        .from("users")
        .select("ID,username,discordID")
        .eq("api_key", req.query.api);

      if (err) return res.status(404).json({ error: "Invalid apikey." });

      if (data.length < 1)
        return res
          .status(404)
          .json({ error: "No user found with that apikey." });

      if (data[0].discordID !== req.query.discordID) {
        await supabase
          .from("users")
          .update({
            discordID: req.query.discordID,
          })
          .eq("api_key", req.query.api);
        return res.status(200).json({
          userID: data[0].ID,
          username: data[0].username,
        });
      } else {
        return res.status(200).json({
          userID: data[0].ID,
          username: data[0].username,
        });
      }
    }
    return res
      .status(404)
      .json({ error: "Both fields are required to bind the account." });
  }
  return res.status(404).json({ error: "Invalid method." });
}
