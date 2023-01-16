export default function Documentation({ release }) {

    return (
      <div className="homeContent">
          <div className="documentationContainer">
            <span id="header">Documentation</span>
            {/* <div className="installation">
              <h1>How to install</h1>
              <p>The current documentation is valid for the <span className="string">{release[0].tag_name}</span> of osu! Tourney Match Displayer.</p>
              <h2>Windows</h2>
              <p>First of all you need to download the <a style={{fontWeight: 600}} href={`https://github.com/AkinariHex/oTMD/releases/download/${release[0].tag_name}/otmd_${release[0].tag_name}_installer.exe`} target="_blank" rel="noreferrer">installer</a>!<br/>Once downloaded, run the installer and continue installing it!<br/>The installer runs with Administrator Privileges.<br/>If Microsoft Defender SmartScreen alert you, don&apos;t worry about it and click Run anyway.<br/><span style={{fontWeight: 600}}>(Make sure you have downloaded it from <a href="https://otmd.app">otmd.app</a> to avoid malicius softwares!).</span></p>
              <p>The default installation folder is <span className="string">C:\Program Files\osu-tourney-match-displayer</span>!</p>
              <p>At first run it will ask you to allow the .exe for the firewall, check only for private networks and allow access.</p>
              <h2>Debian</h2>
              <p>First of all you need to download the <a style={{fontWeight: 600}} href={`https://github.com/AkinariHex/oTMD/releases/download/${release[0].tag_name}/otmd_${release[0].tag_name}_x64.zip`} target="_blank" rel="noreferrer">zip archive</a>!<br/>Once downloaded, extract the .zip file wherever you want and you&apos;re done!</p>
              <p>Now you can open the folder and run <span style={{fontWeight: 600}}>osu! Tourney Match Displayer.exe</span>!</p>
            </div>
            <div className="divider"/> */}
            <div className="fields">
              <h1 style={{marginBottom: "2px"}}>App Sections</h1>
              <h2>Login section</h2>
              <p>When you open the app this is the first section you will see.
              <br/>Here you can find all the profiles you have created or you can create a new one.
              <br/>To create a profile you need:
              <ul style={{lineHeight: "27px"}}>
                <li><span className="string">UserID</span> : Put your userid | <span style={{fontWeight: 600}}>You can find your userid at the end of your profile link <span className="string link">https://osu.ppy.sh/users/<span>4001304</span></span></span></li>
                <li><span className="string">Apikey</span> : Put your apikey of osu! | <a style={{fontWeight: 600}} href="https://osu.ppy.sh/p/api">Where can I find the apikey?</a></li>
              </ul>
              <b>THIS FEATURE THAT ALLOWS YOU TO ADD MORE PROFILES IS NOT MEANT TO PUSH USERS TO CREATE MORE OSU! ACCOUNTS!<br />THE MULTI-ACCOUNT IS SEVERELY BANNED BY THE OSU! STAFF.</b>
              </p>
              <img style={{width: "58%"}} src="https://akinariosu.s-ul.eu/3mPAFhkM" alt="login screen" />
              <h2>Profile section</h2>
              <p>The profile section shows your osu! ID and your current osu! apikey. &nbsp; | <a style={{fontWeight: 600}} href="https://osu.ppy.sh/p/api">Where can I find the apikey?</a><br/> From here you can modify your apikey if you regenerate it from osu!</p>
              <img src="https://akinariosu.s-ul.eu/l6khXkHA" alt="profile section" />
              <h2>Match section</h2>
              <ul style={{lineHeight: "27px"}}>
                <li><span className="string">Match ID</span> : Put the ID of the match you want to display. | <span style={{fontWeight: 600}}>You can find the matchid at the end of an mp link</span><br/><span className="string link">https://osu.ppy.sh/community/matches/<span>69509292</span></span></li>
                <li><span className="string">Match Type</span> : Select the type of the match between <span style={{fontWeight: 600}}>1vs1</span> and <span style={{fontWeight: 600}}>TeamVS</span>.</li>
                <li><span className="string">Stage</span> : Select the current stage of the tournament. | <span style={{fontWeight: 600}}>Friendly is meant to be used if you want to display a match that&apos;s not a tournament</span></li>
                <li><span className="string">Best of</span> : Select the BO of the match.</li>
                <li><span className="string">Warmups</span> : Put the number of warmups. In the most of cases it&apos;s 2.</li>
                <li><span className="string">N. of maps</span> : Put the total number of maps of the Qualifiers Pool | <span style={{fontWeight: 600}}>You&apos;ll see and use this field only if you select Qualifiers as Stage</span></li>
                <li><span className="string">Score Reverse</span> : Check it only if you see a wrong score. | <span style={{fontWeight: 600}}>For example let&apos;s see this lobby: <span className="string">5WC: (Indonesia A) vs (Italy A)</span>, Indonesia A should be the red team as red teams are always the first team that display in the lobby name.</span></li>
              </ul>
              <img src="https://akinariosu.s-ul.eu/5vsGjOpV" alt="match section" />
              <h2>Displayer Settings section</h2>
              <ul style={{lineHeight: "27px"}}>
                <li><span className="string">Visualizer Style</span> : You can choose from 4 different styles:
                  <ul>
                    <li><span className="string">Default</span> : No rounded corners<br/><img src="https://akinariosu.s-ul.eu/fNDp7y7N" style={{borderRadius: "0", marginTop: "2px"}}/></li>
                    <li><span className="string">Rounded</span> : All 4 corners rounded<br/><img src="https://akinariosu.s-ul.eu/fNDp7y7N" style={{borderRadius: "15px", marginTop: "2px"}} /></li>
                    <li><span className="string">Top-Rounded</span> : Top 2 corners rounded<br/><img src="https://akinariosu.s-ul.eu/fNDp7y7N" style={{borderRadius: "15px 15px 0px 0px", marginTop: "2px"}} /></li>
                    <li><span className="string">Bottom-Rounded</span> : Bottom 2 corners rounded<br/><img src="https://akinariosu.s-ul.eu/fNDp7y7N" style={{borderRadius: "0px 0px 15px 15px", marginTop: "2px"}} /></li>
                  </ul>
                </li>
                <li><span className="string">Small Displayer</span> : Enable the small displayer that have less height.</li>
                <li><span className="string">Transparent Background</span> : Enable the transparent background.</li>
              </ul>
              <img src="https://akinariosu.s-ul.eu/sjEgFtqL" alt="displayer section" />
              <h2>App Settings section</h2>
              <ul style={{lineHeight: "27px"}}>
                <li><span className="string">User Interface</span> : Enable compact UI</li>
                <li><span className="string">System Tray</span> : Enable minimize to system tray | <b>Only on Windows</b></li>
                <li><span className="string">Export Matches</span> : This will export and save your matches to the o!TMD website.</li>
                <li><span className="string">o!TMD Website Apikey</span> : To export the matches you need to put here your o!TMD apikey! | You can get if from the settings page on the o!TMD website. <a style={{fontWeight: 600}} href="https://otmd.app/settings">Get your o!TMD apikey</a></li>
              </ul>
              <img src="https://akinariosu.s-ul.eu/aUBLFWmi" alt="app settings section" />
            </div>
            <div className="divider"/>
            <div className="obs">
              <h1>Display on OBS/SLOBS</h1>
              <p>On OBS add a new <span className="string">browser source</span>, name it and put these settings:
                <ul style={{lineHeight: "27px"}}>
                  <li>Uncheck &apos;Local File box&apos;</li>
                  <li><span className="string">URL</span> : <span className="string link">http://localhost:21086/visualizer</span> <span style={{fontWeight: 600}}>(the app copy automatically the url when you save the settings so you can just paste it inside obs)</span></li>
                  <li><span className="string">Width</span> : <span className="string">400</span></li>
                  <li><span className="string">Height</span> : <span className="string">140</span> or <span className="string">90</span> (if you&apos;re using the small displayer)</li>
                  <li>Check &apos;Shutdown source when not visible&apos; box</li>
                  <li>Check &apos;Refresh browser when scene becomes active&apos; box</li>
                  <li><b>Cancel everything inside the Custom CSS field</b></li>
                </ul>
                <img src="https://akinariosu.s-ul.eu/P9whWo4H"/>&nbsp;
                <img style={{width: "32em"}} src="https://akinariosu.s-ul.eu/VHDYFK9C" />
              </p>
            </div>
          </div>
      </div>
    );
}

export async function getServerSideProps() {
  
  const release = await fetch('https://api.github.com/repos/AkinariHex/oTMD/releases');
  

  return {
    props: {
      release: await release.json()
    },
  };
}