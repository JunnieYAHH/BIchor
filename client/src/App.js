import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import PublicRoutes from './components/Routes/PublicRoutes';
import AdminProtectedRoutes from './components/Routes/AdminProtectedRoutes'; // Import AdminProtectedRoutes
import Donations from './pages/admin/Donations';
import ProfileDescription from './pages/user/ProfileDescription';

function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/dashboard' element={<AdminProtectedRoutes element={<Dashboard />} />} /> {/* Use AdminProtectedRoutes */}
        <Route path='/dashboard/admin/donations' element={<AdminProtectedRoutes element={<Donations />} />} /> {/* Use AdminProtectedRoutes */}
        <Route path='/profileDescription' element={<ProtectedRoutes><ProfileDescription /></ProtectedRoutes>} />
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
