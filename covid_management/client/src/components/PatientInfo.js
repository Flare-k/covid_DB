import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import PatientRoute from './PatientRoute';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PatientInfo = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);
    const [scroll, setScroll] = useState('paper');
    const [id, setID] = useState(null);
    const [name, setName] = useState(null);
    
    const handleClickOpen = (scrollType, id) => () => {
        setOpen(true);
        setScroll(scrollType);
        if(detailPatient(id)){
            console.log("데이터 왔어요~");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const detailPatient = async (id) => {
        
        try{
            setLoading(true); // 로딩중
            const res = await axios.get(`/api/patients/info/${id}`);  //비동기 통신으로 접속하고자 하는 주소를 넣는다.
            setResponse(res);
            // console.log("Data: ", JSON.stringify(res));
            setID(res.data[0].patient_id);
            
        }catch(e){
            setError(e);
            return 0;
        }
        setLoading(false); // 로딩 끝
        return 1;
    }
    
    return(
        <div>
            <Button onClick={handleClickOpen('paper', props.id)}>
                동선확인
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{props.id}번 확진자 동선</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                    <PatientRoute 
                        key={id} 
                        patient_id={id}
                    />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    
};

export default PatientInfo;