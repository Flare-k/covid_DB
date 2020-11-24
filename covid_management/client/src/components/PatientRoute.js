import React from 'react';

class PatientRoute extends React.Component{
    render(){
        return(
            <p>
                <h3> {this.props.patient_id}번 도착</h3>
            </p>
        );
    }
}

export default PatientRoute;