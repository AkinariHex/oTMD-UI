import { signIn } from "next-auth/client";

export default function OsuButton() {
  return <button onClick={() => signIn("osu")}>&nbsp;Login with OSU</button>;
}
