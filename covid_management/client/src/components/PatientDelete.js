import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class PatientDelete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false //Dialog 창이 열려있는지
        }
    }

    deletePatient(id) {
        const url = `/api/patients/${id}`;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        }); // 추가 버튼을 누르면 open 값을 true로
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 확진자 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deletePatient(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default PatientDelete;