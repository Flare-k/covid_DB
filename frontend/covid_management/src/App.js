// import logo from './logo.svg';
import './App.css';
import Patient from './components/Patient';

const patients = [
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '신%%',
        'birthday': '940603',
        'gender': '남자',
        'job': 'Air-Force'
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
  return (
    <div>
        {
            patients.map(patient => {
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
        }

    </div>
  );
}

export default App;
