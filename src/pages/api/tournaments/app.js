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
    if (req.query.t) {
      const { data, err } = await supabase
        .from("tournaments_test")
        .select("name,multipliers")
        .match({
          isActive: true,
          acronym: req.query.t,
        });

      if (err) return res.status(404).json({ error: "No tournament found" });

      if (data.length < 1)
        return res.status(200).json({ error: "No tournament found" });

      let tournamentName = data[0].name;
      let multipliers = JSON.parse(data[0].multipliers);
      return res.status(200).json({ tournamentName, multipliers });
    }
    return res.status(404).json({ error: "No tournament found" });
  }
  return res.status(404).json({ error: "invalid method" });
}
