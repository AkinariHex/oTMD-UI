import { useState } from "react";
import { getSession } from "next-auth/react";
import { Copy, Eye, EyeSlash } from "iconsax-react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import supabase from "../../config/supabaseClient";
const generateApiKey = require("generate-api-key");

export default function Settings({ session, userStatus }) {
  const [hideAPI, setHideAPI] = useState(true);
  const [apikey, setApikey] = useState(userStatus.api_key);

  const [discordWebhook, setDiscordWebhook] = useState(
    userStatus.sendMatchesDiscord
  );

  function copyToClipboard() {
    navigator.clipboard.writeText(apikey);
  }

  async function createApikey(id, uuid) {
    /* Random string to generate a different key */
    const randomString = (length = 32) => {
      let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:<>?,./";

      let str = "";
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return str;
    };

    let newAPI = generateApiKey({
      method: "uuidv5",
      name: randomString(),
      namespace: uuid,
      prefix: id,
    });

    const { data, err } = await supabase
      .from("users")
      .update({
        api_key: newAPI,
      })
      .eq("ID", id);

    if (err) {
      return console.log(err);
    }

    setApikey(newAPI);
  }

  async function destroyApikey(id) {
    const { data, err } = await supabase
      .from("users")
      .update({
        api_key: null,
      })
      .eq("ID", id);

    if (err) {
      return console.log("Error deleting apikey!");
    }

    setApikey("You haven't generated any apikey!");
    setHideAPI(false);
  }

  async function saveSendMatches(value) {
    await fetch(`/api/match/webhook?v=${value}`).then((res) => res.json());
  }

  return (
    <div className="settingsPage">
      <div className="settingsContainer">
        <div className="title">Account Settings</div>
        <div className="section">
          <div className="subtitle">o!TMD Apikey</div>
          <div className="field">
            <input
              type="text"
              placeholder="You haven't generated any apikey!"
              value={
                apikey !== undefined && apikey !== null && hideAPI
                  ? "*********************************************"
                  : apikey
              }
              disabled
            />
            {apikey !== undefined &&
            apikey !== null &&
            apikey !== "You haven't generated any apikey!" ? (
              hideAPI ? (
                <>
                  <button
                    onClick={() => setHideAPI((prev) => (prev ? false : true))}
                  >
                    <Eye size="18" color="#dadada" />
                  </button>
                  <Tooltip
                    title="Copied!"
                    position="right"
                    trigger="click"
                    arrow={false}
                  >
                    <button onClick={() => copyToClipboard()}>
                      <Copy size="18" color="#dadada" />
                    </button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setHideAPI((prev) => (prev ? false : true))}
                  >
                    <EyeSlash size="18" color="#dadada" />
                  </button>
                  <Tooltip
                    title="Copied!"
                    position="right"
                    trigger="click"
                    arrow={false}
                  >
                    <button onClick={() => copyToClipboard()}>
                      <Copy size="18" color="#dadada" />
                    </button>
                  </Tooltip>
                </>
              )
            ) : (
              ""
            )}
          </div>
          <div className="buttons">
            <button onClick={() => createApikey(session.id, userStatus.UUID)}>
              Generate Apikey
            </button>
            <button onClick={() => destroyApikey(session.id)}>
              Destroy Apikey
            </button>
          </div>
        </div>
        <div className="section">
          <div className="subtitle">Discord Webhooks</div>
          <div className="field">
            <label className="switch">
              <input
                type="checkbox"
                id="discordWebhook"
                name="discordWebhook"
                checked={discordWebhook}
                onChange={(e) => {
                  setDiscordWebhook(e.target.checked);
                  saveSendMatches(e.target.checked);
                }}
              />
              <span className="slider round"></span>
            </label>
            <span>Send match stats to your Discord Channels</span>
          </div>
          <div
            className="inviteBot"
            onClick={() => {
              window.open(
                "https://discord.com/api/oauth2/authorize?client_id=802887045638651974&permissions=8&scope=bot%20applications.commands",
                "_blank"
              );
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M9.593 10.971c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055.011-.581-.427-1.055-.968-1.055zm3.468 0c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055-.001-.581-.427-1.055-.968-1.055z" />
              <path d="M17.678 3H4.947A1.952 1.952 0 003 4.957v12.844c0 1.083.874 1.957 1.947 1.957H15.72l-.505-1.759 1.217 1.131 1.149 1.064L19.625 22V4.957A1.952 1.952 0 0017.678 3zM14.01 15.407s-.342-.408-.626-.771c1.244-.352 1.719-1.13 1.719-1.13-.39.256-.76.438-1.093.562a6.679 6.679 0 01-3.838.398 7.944 7.944 0 01-1.396-.41 5.402 5.402 0 01-.693-.321c-.029-.021-.057-.029-.085-.048a.117.117 0 01-.039-.03c-.171-.094-.266-.16-.266-.16s.456.76 1.663 1.121c-.285.36-.637.789-.637.789-2.099-.067-2.896-1.444-2.896-1.444 0-3.059 1.368-5.538 1.368-5.538 1.368-1.027 2.669-.998 2.669-.998l.095.114c-1.71.495-2.499 1.245-2.499 1.245s.21-.114.561-.275c1.016-.446 1.823-.57 2.156-.599.057-.009.105-.019.162-.019a7.756 7.756 0 014.778.893s-.751-.712-2.366-1.206l.133-.152s1.302-.029 2.669.998c0 0 1.368 2.479 1.368 5.538 0-.001-.807 1.376-2.907 1.443z" />
            </svg>
            Invite o!TMD Bot
          </div>
          <div className="description">
            <div>
              Make sure to have <strong>o!TMD Bot</strong> inside your Discord
              Server to perform the following commands:
            </div>
            <div>
              <span className="command">/channelmatch add</span>: Enable the
              current channel to receive your matches
            </div>
            <div>
              <span className="command">/channelmatch remove</span>: Remove the
              current channel from receiving your matches
            </div>
          </div>
          <div className="mintitle">Discord Channels</div>
          <div className="list">
            {JSON.parse(userStatus.discordChannelsMatch).map(
              (channel, index) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() =>
                      window.open(
                        `discord://discord.com/channels/${channel.ServerID}/${channel.ChannelID}`,
                        "_blank"
                      )
                    }
                  >
                    <div className="server">{channel.ServerName}</div>
                    <span>|</span>
                    <div className="channel">#{channel.ChannelName}</div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get user session
  const session = await getSession(context);

  const statusData =
    session !== null
      ? await (
          await supabase
            .from("users")
            .select("UUID,api_key,sendMatchesDiscord,discordChannelsMatch")
            .eq("ID", session.id)
        ).data[0]
      : [{}];

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
            session: session,
            userStatus: statusData,
          },
        };

  return { ...returnProps };
}
