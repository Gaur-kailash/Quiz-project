import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import _Private from './components/_Private';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}></Route>
      <Route element={<_Private/>}>
        <Route path='/' element={<Home/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
        </>
  );
}

export default App;
