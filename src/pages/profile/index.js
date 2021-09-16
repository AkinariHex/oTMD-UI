
export default function Account() {

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

/* 
export async function getServerSideProps() {
  
    return {
      props: {
        tournaments: data,
        requests: requests
      },
    };
} */