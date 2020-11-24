import React from 'react';
import PatientInfo from "./PatientInfo";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PatientDelete from './PatientDelete';


class Patient extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.patient_id}</TableCell>
                <TableCell>{this.props.country}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.age}</TableCell>
                <TableCell>{this.props.infection_reason}</TableCell>
                <TableCell>{this.props.confirmed_date}</TableCell>
                <TableCell>{this.props.province} {this.props.city}</TableCell>
                <TableCell><PatientInfo id={this.props.patient_id}/></TableCell>
                <TableCell><PatientDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
            

        );
    }
}
/*
class PatientProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class PatientInfo extends React.Component{
    render(){
        return(
            <div>
                <p> {this.props.birthday}</p>
                <p> {this.props.gender}</p>
                <p> {this.props.job}</p>
            </div>
        );
    }
}
*/
export default Patient;