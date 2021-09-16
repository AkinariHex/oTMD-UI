import { getSession } from "next-auth/client";

export default function Account({ session }) {

  return (
    <div className="homeContent">
      <div className="accountContainer">
        <div className="profileInfo">
          <img src="http://s.ppy.sh/a/4001304" alt="" />
        </div>
        <div className="profileActions"></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);

  const returnProps =
    session === null
      ? {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      : {
          props: {
            session,
          },
        };

  return { ...returnProps };
}
