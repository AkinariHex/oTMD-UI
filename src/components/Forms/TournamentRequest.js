import { set, useForm } from 'react-hook-form';
import { useState } from "react";

function TournamentRequest({ setClass }) {

    const [modalClass, setModalClass] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className={`${setClass} ${modalClass}`}>
            <div className="content">
                <div className="header">
                    <span id="text">tournament request //</span>
                    <div className="icon" onClick={() => setModalClass('hidden')}><i className='bx bx-x'></i></div>
                </div>
            </div>
        </div>
    )
}

export default TournamentRequest
