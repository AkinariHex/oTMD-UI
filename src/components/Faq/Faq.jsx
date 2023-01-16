import React from "react";

function Faq() {
  return (
    <div className="questionsDiv">
      <div className="title">FAQ</div>
      <div className="content">
        <div className="item">
          <div className="question">
            What &quot;osu! Tourney Match Displayer&quot; does?
          </div>
          <div className="answer">
            The &quot;osu! Tourney Match Displayer&quot; app shows in real-time
            the stats of an ongoing osu! multiplayer match. It&apos;s meant to
            be used with tournament matches.
          </div>
        </div>
        <div className="divider"></div>
        <div className="item">
          <div className="question">
            Can the app get sensitive informations of my account?
          </div>
          <div className="answer">
            The app get&apos;s only your public informations and get all the
            data of the match you are playing. No sensitive data will be managed
            by the app.
            <br />
            Remember that you must not show your api key to anyone, if this
            happens generate a new api key from the osu! website.
          </div>
        </div>
        <div className="divider"></div>
        <div className="item">
          <div className="question">What supported tournaments are?</div>
          <div className="answer">
            The app works with most of tournaments but there are some
            tournaments that have custom rules/mods multipliers, so the
            supported tournaments are tournaments that are completely supported
            from the app with the custom rules.
            <br />
            The app will recognize automatically the tournament from the lobby
            name.
          </div>
        </div>
        <div className="divider"></div>
        <div className="item">
          <div className="question">How do I get my osu! API key?</div>
          <div className="answer">
            You can get your osu! API key here:{" "}
            <a href="https://osu.ppy.sh/p/api">osu.ppy.sh/p/api</a>.
            <br />
            This link gets you on the old osu! website because the API key page
            is not present on the newer website. Once you login on the oldest
            website you&apos;ll be redirected to the newer one, this will be a
            little tricky but continue to go back and reload again and again the
            api key link and after a while you&apos;ll get the right page!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
