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

  if (req.method === "GET") {
    if (req.query.discordID) {
      const { data, err } = await supabase
        .from("users")
        .select("discordChannelsMatch")
        .eq("discordID", req.query.discordID);

      if (err) return res.status(404).json({ error: "Error bot." });

      if (data.length < 1)
        return res.status(404).json({
          error:
            "You have to bind your Discord account to your osu! Tourney Match Displayer account with `/bind <otmdapikey>` before using this command.",
        });

      return res
        .status(200)
        .json({ discordChannelsMatch: data[0].discordChannelsMatch });
    }
  }
  if (req.method === "POST") {
    if (req.query.discordID && req.body) {
      const { body } = await req;
      const { data, err } = await supabase
        .from("users")
        .update({ discordChannelsMatch: body })
        .eq("discordID", req.query.discordID);
      if (err) return res.status(404).json({ error: "No submit to database" });
      return res.status(200).json({ status: "Done" });
    }
    return res.status(404).json({ error: "Invalid params" });
  }
  return res.status(404).json({ error: "Invalid method." });
}
