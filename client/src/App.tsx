import './App.css'
import Login from './component/Login';
import Register from './component/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import FirstDay from './component/FirstDay';
import Quizz from './component/Quizz';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/firstday' element={<FirstDay/>}/>
        <Route path='/quizz' element={<Quizz/>}/>
      </Routes>
    </>
  )
}

export default App
