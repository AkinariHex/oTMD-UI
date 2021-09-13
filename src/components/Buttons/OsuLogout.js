import { signOut } from "next-auth/client";

export default function OsuLogout() {
  return <button onClick={() => signOut()}>Logout</button>;
}
