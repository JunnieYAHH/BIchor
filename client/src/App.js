import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
