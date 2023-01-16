import { motion } from 'framer-motion';
import { ExternalLink } from 'react-external-link';
import Faq from '../components/Faq/Faq';

export default function Home({ release }) {
  return (
    <div className="homeContent">
      <div className="appContext">
        <div className="appHeader">
          <object
            type="image/svg+xml"
            data="/img/otmdLOGO.svg"
            className="logoAppHeader"
            alt="otmd logo"
            loading="lazy"
          />
        </div>
        <div className="appText">
          Display easily your osu! Tournament Matches while streaming on Twitch.
        </div>
        <div className="appButtons">
          <ExternalLink
            id="downloadEXE"
            href={`https://github.com/AkinariHex/oTMD/releases/download/${release[0].tag_name}/otmd_${release[0].tag_name}_x64_installer.exe`}
          >
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 12v-8.646l10-1.355v10.001h-10zm11 0h13v-12l-13 1.807v10.193zm-1 1h-10v7.646l10 1.355v-9.001zm1 0v9.194l13 1.806v-11h-13z" />
              </svg>
            </div>
            <div className="text">
              Download <span id="app_ver">{release[0].tag_name}</span>
            </div>
            <div className="file">
              <span className="btn_text_below">installer.exe</span>
            </div>
          </ExternalLink>
          <ExternalLink
            id="downloadLIN"
            href={`https://github.com/AkinariHex/oTMD/releases/download/${release[0].tag_name}/otmd_${release[0].tag_name}_amd64.deb`}
          >
            <div className="icon">
              <svg viewBox="0 0 24 24" height="30" width="30">
                <path d="M18.5 10.57l-.2.37c.26-.78.11-1.63.15-2.37l-.07-.02c-.07-1.85-1.67-3.82-3.09-4.48-1.23-.57-3.12-.67-3.99-.24.12-.11.6-.15.45-.23-1.37.13-1.06.47-2.11.74-.29.28.86-.22.23.16-.56.13-.82-.12-1.65.74.07.12.53-.35.15.12-.79-.09-2.48 1.8-2.84 2.42l.19.04c-.31.77-.72 1.26-.77 1.72-.08 1.14-.45 3.21.08 3.85l-.06.53.23.45-.12.01c.58 1.83.62.04 1.39 1.94-.11-.04-.23-.08-.39-.32-.02.19.24.69.54 1.08l-.12.14c.16.31.32.38.43.49-.63-.35.57 1.13.7 1.32l.1-.17c-.02.24.17.56.53 1.01l.3-.01c.13.24.58.68.85.7l-.18.24c.69.2.33.29 1.18.59l-.17-.3c.43.37.56.7 1.17.98.85.3.96.18 1.82.43-.73 0-1.59 0-2.17-.22-3.96-1.07-7.56-5.72-7.32-10.5-.06-.97.1-2.18-.06-2.42.22-.74.48-1.64 1.01-2.71-.04-.07.09.21.36-.24.16-.36.29-.75.5-1.1l.1-.03c.11-.61 1.43-1.55 1.85-2.02v.18c.86-.81 2.4-1.35 3.26-1.73-.23.25.51-.03 1.04-.06l-.49.28c.63-.16.6.07 1.25-.03-.23.03-.5.1-.46.16.72.08.84-.22 1.51 0l-.05-.2c.94.34 1.13.28 2.14.82.36.01.4-.22.93 0 .1.16-.02.19.64.59.07-.03-.13-.22-.27-.37 1.3.71 2.75 2.22 3.18 3.84-.41-.74-.04.39-.18.33.18.49.33 1 .43 1.53-.12-.43-.39-1.48-.86-2.15-.03.43-.6-.3-.29.66.22.34.05-.35.34.25 0 .29.11.58.18.95-.1-.02-.22-.41-.3-.31.1.5.27.72.33.76-.03.08-.12-.08-.12.24.04.74.21.43.29.46-.09.37-.41.79-.25 1.42l-.2-.56c-.05.53.11.63-.13 1.28.18-.6.16-1.1-.01-.85.09.82-.65 1.45-.58 1.98l-.21-.29c-.57.83-.01.45-.4 1.06.14-.23-.07-.08.11-.36-.12.01-.55.53-.94.83-1.54 1.23-3.39 1.4-5.15.73h-.01c.01-.04 0-.09-.12-.17-1.51-1.15-2.4-2.13-2.11-4.41.25-.17.31-1.12.84-1.45.32-.71 1.28-1.36 2.31-1.38 1.05-.06 1.94.56 2.39 1.14-.82-.75-2.14-.98-3.28-.43-1.15.53-1.84 1.8-1.76 3.07.06-.07.1-.02.12-.18-.03 2.47 2.66 4.28 4.6 3.37l.03.05c.78-.22.68-.39 1.19-.75-.04.09-.34.3-.16.3.25-.06 1.03-.79 1.42-1.13.17-.38-.1-.23.15-.69l.3-.15c.17-.48.35-.75.35-1.32" />
              </svg>
            </div>
            <div className="text">
              Download <span id="app_ver">{release[0].tag_name}</span>
            </div>
            <div className="file">
              <span className="btn_text_below">.deb</span>
            </div>
          </ExternalLink>
          <ExternalLink
            id="discordServer"
            href={'https://discord.com/invite/gf7rWj942q'}
          >
            <div className="icon">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
              </svg>
            </div>
            <div className="text">Official</div>
            <div className="file">Discord Server</div>
          </ExternalLink>
          <ExternalLink
            id="githubRep"
            href={'https://github.com/AkinariHex/oTMD'}
          >
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div className="text">Github</div>
            <div className="file">Repository</div>
          </ExternalLink>
          <ExternalLink id="kofiDon" href={'https://ko-fi.com/akinari'}>
            <div className="icon">
              <img
                height="35px"
                width="35px"
                src="/img/kofi_Icon.png"
                alt="Ko-fi Logo"
              />
            </div>
            <div className="text">Support the app</div>
            {/* 
            <div className="file">
              Repository
            </div> */}
          </ExternalLink>
        </div>
        <motion.div
          animate={{ y: -100, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="appImage"
        >
          <img
            src="/img/appv2.0.png"
            className="app"
            alt="otmd app image"
            loading="lazy"
          />
        </motion.div>
        {/* <AppExample /> */}
        <Faq />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const release = await fetch(
    'https://api.github.com/repos/AkinariHex/oTMD/releases'
  );

  return {
    props: {
      release: await release.json(),
    },
  };
}
