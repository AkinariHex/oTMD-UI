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
    let { data, err } = await supabase
      .from("event_players")
      .select("ID(username,ID,country),rank");

    if (err) return res.status(404).json({ error: "Error getting players" });

    if (data.length < 1) return res.status(404).json({ error: "No players" });

    return res.status(200).json(data);
  }
  return res.status(404).json({ error: "Invalid method." });
}
