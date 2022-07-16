import { signOut } from "next-auth/react";

export default function OsuLogout() {
  return <button onClick={() => signOut()}>Logout</button>;
}
