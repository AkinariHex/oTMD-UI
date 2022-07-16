import { signIn } from "next-auth/react";

export default function OsuButton() {
  return <button onClick={() => signIn("osu")}>&nbsp;Login with OSU</button>;
}
