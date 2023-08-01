import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import AppBar from './components/AppBar';
import Landing from './components/Landing';
import ShowCourses from './components/ShowCourses';
import Login from './components/Login';
import Register from './components/Register';
import Init from './components/Init';
import Course from './components/Course';
function App() {

  return (
    <>
    <RecoilRoot>
      <Router>
        <AppBar />
        <Init />
        <Routes>
          <Route path='/courses' element={<ShowCourses />} />
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses/:courseId' element={<Course />} />
        </Routes>
      </Router>
    </RecoilRoot>

    </>
  )
}

export default App;
