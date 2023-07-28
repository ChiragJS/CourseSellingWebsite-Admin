import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Appbar from "./components/AppBar";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Course from './components/Course';
import Landing from './components/Landing';
import Init from './components/Init';
import { RecoilRoot } from 'recoil';


function App() {
    return (
        <RecoilRoot>
        <div style={{}}> 
        <Router>
            <Appbar />
            <Init />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path='/courses/:courseId' element={<Course />} />
            </Routes>
        </Router>
        </div>
        </RecoilRoot>
    );
    
}

export default App;