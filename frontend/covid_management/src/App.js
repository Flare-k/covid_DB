// import logo from './logo.svg';
import './App.css';
import Patient from './components/Patient';
import Paper from '@material-ui/core/Paper';    //Component의 외부를 감싼다. div -> Paper
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

// style variable 지정
const styles = theme => ({
    root: {
        width:'100%',
        // marginTop: theme.spacing(3),//에러생김...
        overflowX:"auto" //x축으로 오버플로우 발생 가능
    },
    table: {
        minWidth: 1080  //Table은 1080px이상
    }
})

const patients = [
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '신%%',
        'birthday': '940603',
        'gender': '남자',
        'job': '직업군인'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '강##',
        'birthday': '940529',
        'gender': '남자',
        'job': '대학생'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '조@@',
        'birthday': '941003',
        'gender': '남자',
        'job': '취준생'
    }
];

function App() {
    const classes  = styles();
    return (
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
                    {patients.map(patient => {
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
                    })}
                </TableBody>
            </Table>

        </Paper>
    );
}

export default withStyles(styles)(App); // withStyles(styles)를 적용하여 내보낸다.
