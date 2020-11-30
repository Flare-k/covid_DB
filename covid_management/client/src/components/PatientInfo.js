import React, {useEffect, useState, useRef} from 'react';
import PatientRoute from './PatientRoute';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PatientInfo = (props) => {
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);
    const [scroll, setScroll] = useState('paper');
    
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

    const detailPatient = async (patient_id) => {
        try{
            const res = await fetch(`/api/patients/info/${patient_id}`);  //비동기 통신으로 접속하고자 하는 주소를 넣는다.
            const body = await res.json();
            setResponse(body);
            console.log("Response: " + response);
        }catch(error){
            setError(error);
            return 0;
        }
        return [];
    }

    const filteredComponents = (data) => {
            return data.map((p) => 
                            <PatientRoute
                                key={p.patient_id} 
                                patient_id={p.patient_id}
                                start={p.start} 
                                end={p.end} 
                                type={p.type} 
                                province={p.province}
                                city={p.city}
                            />  
    )};


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
                    {response ? filteredComponents(response) : "이동경로를 준비 중입니다."}
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