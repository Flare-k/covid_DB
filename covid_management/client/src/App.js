// import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Patient from './components/Patient';
import PatientAdd from './components/PatientAdd';
import Paper from '@material-ui/core/Paper';    //Component의 외부를 감싼다. div -> Paper
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from '@material-ui/core/styles';

// style variable 지정
const styles = theme => ({
    root: {
        width:'100%',
        marginTop: theme.spacing(3),
        overflowX:"auto" //x축으로 오버플로우 발생 가능
    },
    table: {
        minWidth: 1080  //Table은 1080px이상
    },
    progress: {
        margin: theme.spacing(2)
    }
})

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            patients: "",
            completed: 0
        }//환자 정보를 state 값으로 가져온다.
    }

    stateRefresh = () => {
        this.setState({
            patients: "",
            completed: 0
        });
        this.callApi()
            .then(res => this.setState({patients:res}))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({patients:res}))
            .catch(err => console.log(err));
    }
    callApi = async() => {
        const response = await fetch('/api/patients');  //비동기 통신으로 접속하고자 하는 주소를 넣는다.
        const body = await response.json();     // 불러온 json 데이터를 body에 넣는다.
        return body;    //컴포넌트가 마운트되면 리턴된다.
    }

    progress = () => {
        const {completed} = this.state;
        this.setState({ completed : completed >= 100 ? 0 : completed + 1})
    }

    render(){
        const {classes} = this.props;   // 위에서 정의한 styles를 가져올 수 있다.
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이미지</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>생년월일</TableCell>
                                <TableCell>성별</TableCell>
                                <TableCell>직업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.patients ? this.state.patients.map(patient => {
                                return(
                                    <Patient
                                        key = {patient.id}
                                        id = {patient.id}
                                        image = {patient.image}
                                        name = {patient.name}
                                        birthday = {patient.birthday}
                                        gender = {patient.gender}
                                        job = {patient.job}
                                    />
                                )
                            })
                            : 
                                <TableRow>
                                    <TableCell colSpan="6" align="center">
                                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <PatientAdd stateRefresh={this.stateRefresh}/>
            </div>
        );
    }
}

export default withStyles(styles)(App); // withStyles(styles)를 적용하여 내보낸다.
