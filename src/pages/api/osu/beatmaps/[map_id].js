export default async function handler(req, res) {
  const { map_id } = req.query;
  const { authorization } = req.headers;

  console.log(req.headers);

  const data = await fetch(`https://osu.ppy.sh/api/v2/beatmaps/${map_id}`, {
    headers: { Authorization: authorization },
  }).then((res) => res.json());

  return res.json(data);
}
