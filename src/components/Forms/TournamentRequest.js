import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

function TournamentRequest({ profile, session }) {

    const [isSubmitted, setSubmitted] = useState(false)

    return (
        <div className="collapsibleBody">
                <div className="body">
                    {/* Shows the form if haven't submitted yet */}
                    {!isSubmitted &&
                    <Formik
                        initialValues={{
                            tourneyName: '',
                            tourneyURL: '',
                            acronym: ''
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            let submit = await fetch(`/api/tournaments/requests?s=${profile.UUID}`, {
                                method: "POST",
                                headers: new Headers({"Accept": "application/json", "Content-Type":  "application/json"}),
                                body: JSON.stringify(values)
                            })
                            submit = await submit.json();
                            setSubmitted(true)
                            setTimeout(() => location.reload(), 500)

                        }}
                      >
                        {({ isSubmitting }) => (
                            <Form id="tourneyRequest">
                                <Field id="tourneyName" name="tourneyName" placeholder="Tournament Name" required/>
                                <div className="info">
                                    <Field id="acronym" name="acronym" placeholder="Tournament Acronym"/>
                                    <Field id="tourneyURL" name="tourneyURL" placeholder="Tournament Link" type="url" required/>
                                </div>
                                <button type="submit" disabled={isSubmitting}>Request</button>
                            </Form>
                        )}
                    </Formik>}
                    {/* Shows the submission complete of the form */}
                    {isSubmitted && 
                    <div className="formSubmitted">
                        <img src="/img/success.png" alt="formSuccess" className="formSuccessIcon"/>
                        <span id="text">Tournament successfully requested!</span>
                        <span id="subtext">Reloading the page in <b>1 second</b>!</span>
                    </div>
                    }
                </div>
        </div>
    )
}

export default TournamentRequest
