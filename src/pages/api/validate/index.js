import Cors from "cors";
import supabase from "../../../config/supabaseClient";

const cors = Cors({
  methods: ["POST", "GET"],
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

  if (req.method === "GET" && req.query.api) {
    const { data, err } = await supabase
      .from("users")
      .select("ID")
      .eq("api_key", req.query.api);

    if (err) return res.status(404).json({ error: "Wrong apikey!" });

    if (data.length < 1)
      return res.status(404).json({ error: "Wrong apikey!" });

    return res.status(200).json({ user: data[0].ID });
  }

  return res.status(404).json({ error: "invalid method" });
}
