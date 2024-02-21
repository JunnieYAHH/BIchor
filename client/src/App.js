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
import DonationPage from './pages/user/Donation/DonationPage';
import Transfusion from './pages/user/Transfusion/TransfusionPage';
import Campain from './pages/user/Campain/Campain';

function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        {/* HERE IS THE USER ONLY */}
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/profileDescription' element={<ProtectedRoutes><ProfileDescription /></ProtectedRoutes>} />
        <Route path='/donationPage' element={<ProtectedRoutes><DonationPage /></ProtectedRoutes>} />
        <Route path='/transfusionPage' element={<ProtectedRoutes><Transfusion /></ProtectedRoutes>} />
        <Route path='/transfusionPage' element={<ProtectedRoutes><Campain /></ProtectedRoutes>} />
        {/* HERE IS THE ADMIN */}
        <Route path='/dashboard' element={<AdminProtectedRoutes element={<Dashboard />} />} /> {/* Use AdminProtectedRoutes */}
        <Route path='/dashboard/admin/donations' element={<AdminProtectedRoutes element={<Donations />} />} /> {/* Use AdminProtectedRoutes */}
        {/* PROFILE LOGIN */}
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
