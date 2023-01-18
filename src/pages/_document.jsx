import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/ico" href="/img/otmd.ico" />
          <meta charSet="utf-8" />
          {/* HTML */}
          <meta
            name="description"
            content="Display easily the score of your osu! matches in real-time while streaming on twitch!"
          />
          <meta name="author" content="Akinari" />
          <meta name="copyright" content="Akinari" />
          <meta
            name="keywords"
            content="OTMD, o!TMD, otmd, osu! Tourney Match Displayer, osu! Match Displayer"
          />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#0C121DCC" />
          {/* DISCORD */}
          <meta property="og:url" content="https://otmd.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="osu! Tourney Match Displayer" />
          <meta
            property="og:description"
            content="Display easily the score of your osu! matches in real-time while streaming on twitch!"
          />
          <meta
            property="og:image"
            content="https://akinariosu.s-ul.eu/oMHsqwch"
          />
          {/* TWITTER */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="otmd.app" />
          <meta property="twitter:url" content="https://otmd.app/" />
          <meta name="twitter:title" content="osu! Tourney Match Displayer" />
          <meta
            name="twitter:description"
            content="Display easily the score of your osu! matches in real-time while streaming on twitch!"
          />
          <meta name="twitter:site" content="@akinari_osu" />
          <meta name="twitter:image:alt" content="OTMD Logo" />
          <meta
            name="twitter:image"
            content="https://akinariosu.s-ul.eu/oMHsqwch"
          ></meta>
          <link
            href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
            rel="stylesheet"
          ></link>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-FB42B4PE0Q"
            strategy="worker"
          ></Script>
          <Script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FB42B4PE0Q');`,
            }}
            strategy="worker"
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
