import { getSession, Provider } from "next-auth/client";
import "../styles/styles.css";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps, session, userStatus }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/ico" href="/img/otmd.ico" />
        <title>osu! Tourney Match Displayer</title>
        <meta property="og:title" content="osu! Tourney Match Displayer" />
        <meta property="og:description" content="Simple displayer made to be used as a browser source on OBS/SLOBS that displays the current state of an osu! tournament match!" />
        <meta property="og:image" content="https://akinariosu.s-ul.eu/y16opY95" />
        <meta property="og:url" content="https://otmd.vercel.app" />
        <meta name="twitter:creator" content="@akinari_osu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://akinariosu.s-ul.eu/y16opY95" />
        <meta property="og:site_name" content="osu! Tourney Match Displayer" />
        <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
      </Head>
      <Navbar session={session} userStatus={userStatus} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  // Get user session
  const session = await getSession(context.ctx);

  const statusData =
    session !== null
      ? await fetch(
          `${process.env.NEXTAUTH_URL}/api/users?u=${session.id}`
        ).then((res) => res.json()).then(res => res[0])
      : [{}];

  return {
    session: session,
    userStatus: statusData,
  };
};

export default MyApp;
