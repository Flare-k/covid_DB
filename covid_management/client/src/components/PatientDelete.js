import React from 'react';

class PatientDelete extends React.Component {
    
    deletePatient(id) {
        const url = `/api/patients/${id}`;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
    
    render() {
        return (
            <button onClick={(e) => {this.deletePatient(this.props.id)}}>삭제</button>
        )
    }
}

export default PatientDelete;