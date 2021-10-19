import { getSession, Provider } from "next-auth/client";
import "../styles/styles.css";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps, session, userStatus }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/ico" href="/img/otmd.ico" />
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>osu! Tourney Match Displayer</title>
        <meta name="description" content="Display easily the score of your osu! matches in real-time while streaming on twitch!"/>
        <meta name="author" content="Akinari"/>
        <meta name="copyright" content="Akinari"/>
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="osu! Tourney Match Displayer"/>
        <meta property="og:url" content="https://otmd.app"/>
        <meta property="og:image" content="https://akinariosu.s-ul.eu/CKOXOZMi"/>
        <meta property="og:description" content="Display easily the score of your osu! matches in real-time while streaming on twitch!"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="osu! Tourney Match Displayer"/>
        <meta name="twitter:site" content="@akinari_osu"/>
        <meta name="twitter:description" content="Display easily the score of your osu! matches in real-time while streaming on twitch!"/>
        <meta name="twitter:image" content="https://akinariosu.s-ul.eu/CKOXOZMi"/>
        <meta name="twitter:image:alt" content="OTMD Logo"/>
        <meta property="og:site_name" content="osu! Tourney Match Displayer" />
        <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FB42B4PE0Q"></script>
        <script dangerouslySetInnerHTML={{ __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FB42B4PE0Q');`}}></script>
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
