import React from 'react';

const PatientRoute = (props) => {
        return(
            <div>
                <h4> {props.province} {props.city}</h4>
                <h4> {props.start.slice(0, 10)} ~ {props.end.slice(0, 10)}  {props.type}</h4>
                <hr size="10px"/>

            </div>
        );
    }

export default PatientRoute;