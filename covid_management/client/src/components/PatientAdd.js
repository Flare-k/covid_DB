// 서버 통신 위해 axios 사용
import React from "react";
import {post} from "axios";


class PatientAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,    // 프로필 이미지를 파일 형태로..
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ""
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addPatient()
            .then((res) => {
                console.log(res.data);
            });     // 파일을 전송하면 콘솔창에 보이도록
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //e.target = 이벤트가 발생한 인풋값
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value
        this.setState(nextState);
    }

    addPatient = () =>{
        const url = '/api/patients';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        // 파일이 포함된 데이터를 서버로 보낼때 -> 헤더 필요
        const config = {
            headers: {
                'content-type': 'multipart/form-data'   // multipart/form-data는 데이터에 파일이 있을 경우 설정 해준다. 위에서 image 때문. 
            }
        }

        return post(url, formData, config); // 해당 url에 formData를 환경설정(config)에 맞게.. post는 axios의 함수
    }

    render() {
        return(
            <from onSubmit={this.handleFormSubmit}>
                <h1>확진자 추가</h1>
                병원 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input> <br/>
                이름: <input type="text" name = "userName" value={this.state.userName} onChange={this.state.handleValueChange}></input> <br/>
                생년월일: <input type="text" name = "birthday" value={this.state.birthday} onChange={this.state.handleValueChange}></input> <br/>
                성별: <input type="text" name = "gender" value={this.state.gender} onChange={this.state.handleValueChange}></input> <br/>
                직업: <input type="text" name = "job" value={this.state.job} onChange={this.state.handleValueChange}></input> <br/>
                <button type="submit">추가하기</button>
            </from>
        )
    }
}

export default PatientAdd;