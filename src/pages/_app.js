import { getSession, Provider } from "next-auth/client";
import "../styles/styles.css";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <Navbar session={session} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context) => {
  // Get user session
  const session = await getSession(context.ctx);

  return {
      session
  };
} 
