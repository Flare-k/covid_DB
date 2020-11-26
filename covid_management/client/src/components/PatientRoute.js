import React from 'react';

const PatientRoute = (props) => {
        return(
            <p>
                <h3> {props.patient_id}번 도착</h3>
            </p>
        );
    }

export default PatientRoute;