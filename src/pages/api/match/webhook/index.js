import Cors from "cors";
import supabase from "../../../../config/supabaseClient";
import { getSession } from "next-auth/react";

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
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET" && req.query.v) {
      const { data, error } = await supabase
        .from("users")
        .update({
          sendMatchesDiscord: req.query.v,
        })
        .eq("ID", session.id);

      if (error)
        return res.status(404).json({
          error: "User not found",
        });

      return res.status(200).json({ status: "success" });
    }
    return res.status(404).json({ error: "Invalid method" });
  }
  return res.status(401).json({ error: "unauthorized" });
}
