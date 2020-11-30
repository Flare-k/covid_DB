// 서버 통신 위해 axios 사용
import React from "react";
import {post} from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});
/*
patient_id={p.patient_id}
country={p.country} 
gender={p.gender} 
age={p.age} 
infection_reason={p.infection_reason} 
confirmed_date={p.confirmed_date.slice(0, 10)}
province={p.province}
city={p.city}
*/

class PatientAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            patient_id: '',
            country: '',
            gender: '',
            age: '',
            infection_reason: '',
            confirmed_date: '',
            province: '',
            city: '',
            open: false //Dialog 창이 열려있는지
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addPatient()
        .then((res) => {
            console.log(res.data);
            this.props.stateRefresh();  //데이터를 전달하고나서 부모 컴포넌트에 있는 함수 실행.
        })     // 파일을 전송하면 콘솔창에 보이도록
        //window.location.reload();  페이지를 바로 새로고침하여 확진자 데이터를 받아올 수 있도록 구현
        // SPA(Single Page Application); 전체페이지 새로고침 -> 비효율적..
        // 부모 컴포넌트 상태변경이 적합하다. (필요 부분 새로고침)
        // 데이터를 추가하면 State를 Refresh하고 고객 목록을 불러오는 callApi()를 Refresh 해주자.
        this.setState({
            patient_id: '',
            country: '',
            gender: '',
            age: '',
            infection_reason: '',
            confirmed_date: '',
            province: '',
            city: '',
            open: false
        });
    }

    handleValueChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addPatient = () =>{
        const url = '/api/patients';
        const formData = new FormData();
        formData.append('patient_id', this.state.patient_id)
        formData.append('country', this.state.country)
        formData.append('gender', this.state.gender)
        formData.append('age', this.state.age)
        formData.append('infection_reason', this.state.infection_reason)
        formData.append('confirmed_date', this.state.confirmed_date)
        formData.append('province', this.state.province)
        formData.append('city', this.state.city)
        // 파일이 포함된 데이터를 서버로 보낼때 -> 헤더 필요
        const config = {
            headers: {
                'content-type': 'multipart/form-data'   // multipart/form-data는 데이터에 파일이 있을 경우 설정 해준다.
            }
        }

        return post(url, formData, config); // 해당 url에 formData를 환경설정(config)에 맞게.. post는 axios의 함수
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        }); // 추가 버튼을 누르면 open 값을 true로
    }
    handleClose = () => {
        this.setState({
            patient_id: '',
            country: '',
            gender: '',
            age: '',
            infection_reason: '',
            confirmed_date: '',
            province: '',
            city: '',
            open: false
        });
    }

    render() {
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    확진자 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>확진자 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="확진번호" type="text" name = "patient_id" value={this.state.patient_id} onChange={this.handleValueChange} /> <br/>
                        <TextField label="국적" type="text" name = "country" value={this.state.country} onChange={this.handleValueChange} /> <br/>
                        <TextField label="성별" type="text" name = "gender" value={this.state.gender} onChange={this.handleValueChange} /> <br/>
                        <TextField label="나이" type="text" name = "age" value={this.state.age} onChange={this.handleValueChange} /> <br/>
                        <TextField label="감염경로" type="text" name = "infection_reason" value={this.state.infection_reason} onChange={this.handleValueChange} /> <br/>
                        <TextField label="확진날짜 (YYYY-MM-DD)" type="text" name = "confirmed_date" value={this.state.confirmed_date} onChange={this.handleValueChange} /> <br/>
                        <TextField label="도시명" type="text" name = "province" value={this.state.province} onChange={this.handleValueChange} /> <br/>
                        <TextField label="행정동" type="text" name = "city" value={this.state.city} onChange={this.handleValueChange} /> <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PatientAdd);