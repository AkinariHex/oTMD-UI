import { getSession } from "next-auth/react";
import "../styles/styles.css";
import "../styles/exampleApp.css";
import "../styles/tournaments.css";
import "../styles/documentation.css";
import "../styles/profile.css";
import "../styles/settings.css";
import "../styles/event.css";
import "../styles/teamslist.css";
import "../styles/teamschedule.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import supabase from "../config/supabaseClient";

function MyApp({ Component, pageProps, session, userStatus }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>osu! Tourney Match Displayer</title>
      </Head>
      <Navbar session={session} userStatus={userStatus} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  // Get user session
  const session = await getSession(context.ctx);

  const statusData =
    session !== null
      ? await (
          await supabase
            .from("users")
            .select("permissions")
            .eq("ID", session.id)
        ).data[0]
      : "User";

  return {
    session: session,
    userStatus: statusData,
  };
};

export default MyApp;
