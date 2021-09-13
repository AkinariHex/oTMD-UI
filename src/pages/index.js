import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import OsuButton from "../components/Buttons/OsuLogin";
import Image from "next/image";
import OsuLogout from "../components/Buttons/OsuLogout";

export default function Home({ session }) {
  return (
    <div>
      {session !== null ? (
        <div>
          <b>{session.username}</b>
          <br />
          <OsuLogout />
        </div>
      ) : (
        <OsuButton />
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // Get user session
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
}
