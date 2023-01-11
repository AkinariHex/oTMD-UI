import Cors from 'cors';
import supabase from '../../../config/supabaseClient';

const cors = Cors({
  methods: ['GET', 'POST'],
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

  if (req.method === 'POST') {
    const { players, length } = req.body;

    let { data: playersDB, err } = await supabase
      .from('event_players')
      .select('ID');

    if (err) return res.status(404).json({ error: 'Error getting players' });

    playersDB.forEach(async (player) => {
      await supabase
        .from('event_players')
        .update({
          points: parseInt(players[player.ID]),
          average: parseInt(players[player.ID] / length),
        })
        .eq('ID', parseInt(player.ID));
    });

    return res.status(200).json(playersDB);
  }
  return res.status(404).json({ error: 'Invalid method.' });
}
