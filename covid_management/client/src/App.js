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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


// style variable 지정
const styles = theme => ({
    root: {
        width:'100%',
        
    },
    menu:{
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        marginLeft: 18,
        marginRight: 18
    },
    progress: {
        margin: theme.spacing(2)
    },
    grow: {
    flexGrow: 1,
    },
    tableHead:{
        fontSize: '1.0rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
});

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            patients: '',
            completed: 0,
            searchKeyword: '',
            posts: [],
            currentPage: 1,
            postsPerPage: 10
        }//환자 정보를 state 값으로 가져온다.
    }

    stateRefresh = () => {
        this.setState({
            patients: '',
            completed: 0,
            searchKeyword: ''
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
        // this.setState(posts: body.data);
        return body;    //컴포넌트가 마운트되면 리턴된다.
    }

    progress = () => {
        const {completed} = this.state;
        this.setState({ completed : completed >= 100 ? 0 : completed + 1})
    }

    handleValueChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    render(){
        const filteredComponents = (data) => {
            data = data.filter((p) => {
                return p.city.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((p) => {
                return <Patient stateRefresh={this.stateRefresh} 
                            key={p.patient_id} 
                            patient_id={p.patient_id}
                            country={p.country} 
                            gender={p.gender} 
                            age={p.age} 
                            infection_reason={p.infection_reason} 
                            confirmed_date={p.confirmed_date.slice(0, 10)}
                            province={p.province}
                            city={p.city}/>
            });
        }
        const {classes} = this.props;   // 위에서 정의한 styles를 가져올 수 있다.
        const cellList = ['확진번호', '국적', '성별', '나이', '감염경로', '확진날짜', '거주지','동선', '설정'];
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap href='/api/patients'>
                            확진자 관리 시스템
                        </Typography>
                        <div className={classes.grow}></div>
                        <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="행정동 검색..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name="searchKeyword"
                                    value={this.state.searchKeyword}
                                    onChange={this.handleValueChange}
                                />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <PatientAdd stateRefresh={this.stateRefresh}/>
                </div>
                <div>
                    
                </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c => {
                                    return <TableCell className={classes.tableHead}>{c}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.patients ? 
                            filteredComponents(this.state.patients)
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
            </div>
        );
    }
}

export default withStyles(styles)(App); // withStyles(styles)를 적용하여 내보낸다.
