import { Formik, Field, Form } from "formik";
import { useState } from "react";
import Collapsible from "react-collapsible";
import supabase from "../../config/supabaseClient";

function EditTournament({ profile, session, tournament }) {
  const [isSubmitted, setSubmitted] = useState(false);

  const [tournamentForm, setTournamentForm] = useState(["action", "down"]);

  const multipliersJSON = JSON.parse(tournament.multipliers);
  const multipliers = Object.keys(multipliersJSON);

  return (
    <Collapsible
      onTriggerOpening={() => {
        setTournamentForm(["actionOpen", "up"]);
      }}
      onTriggerClosing={() => {
        setTournamentForm(["action", "down"]);
      }}
      transitionTime="200"
      easing="ease-out"
      trigger={
        <div className={tournamentForm[0]}>
          <div className="text">
            <strong>{tournament.acronym}</strong> &nbsp; {tournament.name}
          </div>
          <div className="utilityIcon">
            <i className={`bx bxs-${tournamentForm[1]}-arrow`}></i>
          </div>
        </div>
      }
    >
      <div className="collapsibleBody">
        <div className="body">
          {/* Shows the form if haven't submitted yet */}
          {!isSubmitted && (
            <Formik
              initialValues={{
                tourneyName: tournament.name,
                acronym: tournament.acronym,
                forumID: tournament.forumID,
                website: tournament.website,
                startDate: tournament.tourney_start,
                endDate: tournament.tourney_end,
                NMstatus: multipliersJSON.NM?.type /* NM */,
                NMvalue: multipliersJSON.NM?.value,
                HDstatus: multipliersJSON.HD?.type /* HD */,
                HDvalue: multipliersJSON.HD?.value,
                HRstatus: multipliersJSON.HR?.type /* HR */,
                HRvalue: multipliersJSON.HR?.value,
                DTstatus: multipliersJSON.DT?.type /* DT */,
                DTvalue: multipliersJSON.DT?.value,
                EZstatus: multipliersJSON.EZ?.type /* EZ */,
                EZvalue: multipliersJSON.EZ?.value,
                FLstatus: multipliersJSON.FL?.type /* FL */,
                FLvalue: multipliersJSON.FL?.value,
                SDstatus: multipliersJSON.SD?.type /* SD */,
                SDvalue: multipliersJSON.SD?.value,
                SDfailValue: multipliersJSON.SD?.failValue,
                HTstatus: multipliersJSON.HT?.type /* HT */,
                HTvalue: multipliersJSON.HT?.value,
              }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));

                let multipliers = {
                  NM: {
                    type: values?.NMstatus ?? "*",
                    value: values?.NMvalue ?? "1.00",
                  },
                  HD: {
                    type: values?.HDstatus ?? "*",
                    value: values?.HDvalue ?? "1.00",
                  },
                  HR: {
                    type: values?.HRstatus ?? "*",
                    value: values?.HRvalue ?? "1.00",
                  },
                  DT: {
                    type: values?.DTstatus ?? "*",
                    value: values?.DTvalue ?? "1.00",
                  },
                  EZ: {
                    type: values?.EZstatus ?? "*",
                    value: values?.EZvalue ?? "1.00",
                  },
                  FL: {
                    type: values?.FLstatus ?? "*",
                    value: values?.FLvalue ?? "1.00",
                  },
                  SD: {
                    type: values?.SDstatus ?? "*",
                    value: values?.SDvalue ?? "1.00",
                    failValue: values?.SDfailValue ?? "1.00",
                  },
                  HT: {
                    type: values?.HTstatus ?? "*",
                    value: values?.HTvalue ?? "1.00",
                  },
                };

                const { data, err } = await supabase
                  .from(`${process.env.NEXT_PUBLIC_DB_TOURNAMENTS}`)
                  .update({
                    acronym: values.acronym,
                    name: values.tourneyName,
                    forumID: values.forumID,
                    tourney_start: values.startDate,
                    tourney_end: values.endDate,
                    website: values.website,
                    multipliers: JSON.stringify(multipliers),
                  })
                  .eq("UUID", tournament.UUID)
                  .eq("host", profile.ID);

                if (err) {
                  return console.log(err);
                }

                setSubmitted(true);
                setTimeout(() => location.reload(), 500);
              }}
            >
              {({ isSubmitting }) => (
                <Form id="tourneyEdit">
                  <div className="tourneyEditName">
                    <div className="acronym">
                      <label htmlFor="acronym">Acronym</label>
                      <Field
                        id="acronym"
                        name="acronym"
                        placeholder="Acronym"
                        spellCheck="false"
                        required
                      />
                    </div>
                    <div className="name">
                      <label htmlFor="tourneyName">Tournament Name</label>
                      <Field
                        id="tourneyName"
                        name="tourneyName"
                        placeholder="Tournament Name"
                        spellCheck="false"
                        required
                      />
                    </div>
                  </div>
                  <div className="editSocials">
                    <div className="forum">
                      <label htmlFor="forumID">Forum ID</label>
                      <Field
                        id="forumID"
                        name="forumID"
                        placeholder="Forum ID"
                        spellCheck="false"
                        required
                      />
                    </div>
                    <div className="website">
                      <label htmlFor="website">Website</label>
                      <Field
                        type="url"
                        id="website"
                        name="website"
                        placeholder="Website"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="startEndDates">
                    <div className="start">
                      <label htmlFor="startDate">
                        Qualifiers Date{" "}
                        <span className="specialInfo">*mm/dd/yyyy</span>
                      </label>
                      <Field
                        id="startDate"
                        name="startDate"
                        placeholder="Start Date"
                        spellCheck="false"
                        required
                      />
                    </div>
                    <div className="end">
                      <label htmlFor="endDate">
                        Grand Finals Date{" "}
                        <span className="specialInfo">*mm/dd/yyyy</span>
                      </label>
                      <Field
                        id="endDate"
                        name="endDate"
                        placeholder="End Date"
                        spellCheck="false"
                        required
                      />
                    </div>
                  </div>
                  <div className="multipliers">
                    {multipliers.map((multiplier, index) => {
                      return (
                        <div className="multiplier" key={index}>
                          <label htmlFor="settingsMultiplier">
                            {multiplier} Multiplier{" "}
                            <span className="specialInfo">
                              &nbsp;* = multiplication&nbsp; / = division
                            </span>
                          </label>
                          <div className="settingsMultiplier">
                            <Field
                              id={`${multiplier}status`}
                              name={`${multiplier}status`}
                              className="multiplierStatus"
                              placeholder={`Status`}
                              spellCheck="false"
                              required
                            />
                            <Field
                              id={`${multiplier}value`}
                              name={`${multiplier}value`}
                              className="multiplierValue"
                              placeholder={`Value`}
                              spellCheck="false"
                              required
                            />
                            {multiplier === "SD" && (
                              <Field
                                id={`${multiplier}failValue`}
                                name={`${multiplier}failValue`}
                                style={{ display: "none" }}
                                placeholder={`Fail Value`}
                                spellCheck="false"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    Save
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
              <span id="text">Tournament successfully modified!</span>
              <span id="subtext">
                Reloading the page in <b>1 second</b>!
              </span>
            </div>
          )}
        </div>
      </div>
    </Collapsible>
  );
}

export default EditTournament;
