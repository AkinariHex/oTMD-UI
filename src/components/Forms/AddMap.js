import React from 'react'
import { Formik, Field, Form } from 'formik';

function AddMap({ token, teamID, setNMList, NMList, setHDList, HDList, setHRList, HRList, setDTList, DTList, setFMList, FMList, setTBList, TBList}) {

    const list = {
        "nm": [setNMList, NMList]
    }

    return (
        <Formik
            initialValues={{
                mappoolStage: 'qualifiers',
                mapID: '',
                mapMod: 'nm',
                mapModNumber: '1'
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                let osuMapData = await fetch(`/api/osu/beatmaps/${values.mapID}`, {
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
                }).then(res => res.json());
                
                let data = await {
                    "beatmapset_id": osuMapData.beatmapset_id,
                    "beatmap_id": osuMapData.id,
                    "status": osuMapData.status,
                    "total_length": osuMapData.total_length,
                    "mapper_username": osuMapData.beatmapset.creator,
                    "mapper_id": osuMapData.beatmapset.user_id,
                    "artist": osuMapData.beatmapset.artist,
                    "title": osuMapData.beatmapset.title,
                    "version": osuMapData.version,
                    "od": osuMapData.accuracy,
                    "ar": osuMapData.ar,
                    "bpm": osuMapData.bpm,
                    "cs": osuMapData.cs,
                    "hp": osuMapData.drain,
                    "star_rating": osuMapData.difficulty_rating,
                    "mods": [values.mapMod, values.mapModNumber],
                    "stage": values.mappoolStage
                }

                let submit = await fetch(`/api/teams/mappools?t=${teamID}`, {
                    method: "POST",
                    headers: new Headers({"Accept": "application/json", "Content-Type":  "application/json"}),
                    body: JSON.stringify(data)
                })
                submit = await submit.json();

                switch (values.mapMod) {
                    case "nm": {
                        let mappoolList = await [...NMList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setNMList(mappoolList)
                        break;
                    }
                    case "hd": {
                        let mappoolList = await [...HDList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setHDList(mappoolList)
                        break;
                    }
                    case "hr": {
                        let mappoolList = await [...HRList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setHRList(mappoolList)
                        break;
                    }
                    case "dt": {
                        let mappoolList = await [...DTList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setDTList(mappoolList)
                        break;
                    }
                    case "fm": {
                        let mappoolList = await [...FMList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setFMList(mappoolList)
                        break;
                    }
                    case "tb": {
                        let mappoolList = await [...TBList];
                        mappoolList[values.mapModNumber - 1] = await data
                        setTBList(mappoolList)
                        break;
                    }
                }

            }}
        >
            <Form className="addMap">
                <div className="stage">
                    Stage:
                    <Field name="mappoolStage" id="mappoolStage" className='stageDropdown' as="select" placeholder="Stage" required>
                        <option value="qualifiers">Qualifiers</option>
                        <option value="ro32">RO32</option>
                        <option value="ro16">RO16</option>
                        <option value="quarterfinals">Quarterfinals</option>
                        <option value="semifinals">Semifinals</option>
                        <option value="finals">Finals</option>
                        <option value="grandfinals">Grand Finals</option>
                    </Field>
                </div>
                <div className="mapInputs">
                    <Field id="mapID" type="text" name="mapID" placeholder="beatmapID" pattern="[0-9]+" required/>
                    <Field as="select" id="mapMod" name="mapMod" placeholder="mod" required>
                        <option value="nm">NM</option>
                        <option value="hd">HD</option>
                        <option value="hr">HR</option>
                        <option value="dt">DT</option>
                        <option value="fm">FM</option>
                        <option value="fl">FL</option>
                        <option value="ez">EZ</option>
                        <option value="tb">TB</option>
                    </Field>
                    <Field as="select" id="mapModNumber" name="mapModNumber" placeholder="n." required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Field>
                    <button type="submit">Add Map</button>
                </div>
            </Form>
        </Formik>
    )
}

export default AddMap
