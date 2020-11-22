import React from 'react';

class PatientRoute extends React.Component{
    render(){
        return(
            <p>
                <h3> {this.props.id}번: {this.props.name}</h3>
            </p>
        );
    }
}

export default PatientRoute;