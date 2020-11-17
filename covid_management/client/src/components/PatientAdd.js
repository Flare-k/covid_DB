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


class PatientAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,    // 프로필 이미지를 파일 형태로..
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
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
            file: null,    // 프로필 이미지를 파일 형태로..
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //e.target = 이벤트가 발생한 인풋값
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addPatient = () =>{
        const url = '/api/patients';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        // 파일이 포함된 데이터를 서버로 보낼때 -> 헤더 필요
        const config = {
            headers: {
                'content-type': 'multipart/form-data'   // multipart/form-data는 데이터에 파일이 있을 경우 설정 해준다. 위에서 image 때문. 
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
            file: null,    // 프로필 이미지를 파일 형태로..
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    확진자 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>확진자 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "이미지 선택" : this.state.fileName}
                            </Button> <br/>
                        </label>
                        <TextField label="이름" type="text" name = "userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                        <TextField label="생년월일" type="text" name = "birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                        <TextField label="성별" type="text" name = "gender" value={this.state.gender} onChange={this.handleValueChange} /> <br/>
                        <TextField label="직업" type="text" name = "job" value={this.state.job} onChange={this.handleValueChange} /> <br/>
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