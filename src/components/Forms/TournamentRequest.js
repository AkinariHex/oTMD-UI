import { Formik, Field, Form } from "formik";
import { useState } from "react";
import supabase from "../../config/supabaseClient";

function TournamentRequest({ profile, session }) {
  const [isSubmitted, setSubmitted] = useState(false);

  const sendToDiscord = (tourneyName, tourneyURL, userid, username, propic) => {
    let jsonData = {
      embeds: [
        {
          author: {
            name: `Tournament Request`,
            url: `https://osu.ppy.sh/users/${userid}`,
            icon_url: propic,
          },
          color: 0x00ffff,
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Tournament",
              value: tourneyName,
              inline: true,
            },
            {
              name: "Link",
              value: `[Forum Post](${tourneyURL})`,
              inline: true,
            },
            {
              name: "Request by",
              value: `[${username}](https://osu.ppy.sh/users/${userid})`,
              inline: true,
            },
          ],
        },
      ],
    };

    fetch(process.env.NEXT_PUBLIC_DISCORD_WH, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    return;
  };

  return (
    <div className="collapsibleBody">
      <div className="body">
        {/* Shows the form if haven't submitted yet */}
        {!isSubmitted && (
          <Formik
            initialValues={{
              tourneyName: "",
              tourneyURL: "",
              acronym: "",
              host: "",
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));

              const { data, err } = await supabase
                .from(`${process.env.NEXT_PUBLIC_DB_TOURNEY_REQUESTS}`)
                .insert({
                  acronym: values.acronym,
                  name: values.tourneyName,
                  tourneyHost: parseInt(values.tourneyHost),
                  forumID: values.tourneyURL,
                  requester: session.id,
                  status: "Pending",
                  dateRequest: Math.floor(new Date().getTime() / 1000.0),
                });

              if (err) {
                return console.log(err);
              }

              setSubmitted(true);
              setTimeout(() => location.reload(), 500);
              sendToDiscord(
                values.tourneyName,
                values.tourneyURL,
                session.id,
                session.username,
                session.avatar_url
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form id="tourneyRequest">
                <div className="tourneyNameInfo">
                  <Field
                    id="acronym"
                    name="acronym"
                    placeholder="Tournament Acronym"
                  />
                  <Field
                    id="tourneyName"
                    name="tourneyName"
                    placeholder="Tournament Name"
                    required
                  />
                </div>
                <div className="info">
                  <Field
                    id="host"
                    name="host"
                    placeholder="Tournament Host ID"
                  />
                  <Field
                    id="tourneyURL"
                    name="tourneyURL"
                    placeholder="Tournament Link"
                    type="url"
                    required
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Request
                </button>
              </Form>
            )}
          </Formik>
        )}
        {/* Shows the submission complete of the form */}
        {isSubmitted && (
          <div className="formSubmitted">
            <img
              src="/img/success.png"
              alt="formSuccess"
              className="formSuccessIcon"
            />
            <span id="text">Tournament successfully requested!</span>
            <span id="subtext">
              Reloading the page in <b>1 second</b>!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TournamentRequest;
