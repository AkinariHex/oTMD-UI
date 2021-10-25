import { getSession } from "next-auth/client"
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export default async function handler(req, res) {

  const session = await getSession({ req })

  if (req.method === 'POST') {
    if(req.query.s !== null) {
      if(session){
        (uuidValidateV4(req.query.s))
          ? res.status(200).json({ status: 'access allowed', uuid: uuidValidateV4(req.query.s), session: session })
          : res.status(401).json({ status: 'access denied', uuid: uuidValidateV4(req.query.s), session: session })
      } else {
        res.status(401).json({status: 'access denied', session: session })
      }
    } else {
      res.status(401).json({status: 'access denied'})
    }
  }
  res.end()
}
