import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import PublicRoutes from './components/Routes/PublicRoutes';
import AdminProtectedRoutes from './components/Routes/AdminProtectedRoutes';
import ProfileDescription from './pages/user/ProfileDescription';
import DonationPage from './pages/user/Donation/DonationPage';
import Transfusion from './pages/user/Transfusion/TransfusionPage';
import Campain from './pages/user/Campain/Campain';
import Appointment from './pages/admin/Appointment/Appointment';
import UpdateAppointment from './pages/admin/Appointment/UpdateAppointment';
import Donor from './pages/admin/Donor/Donor';
import CreateDonor from './pages/admin/Donor/CreateDonor';
import UpdateDonor from './pages/admin/Donor/UpdateDonor';

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
        <Route path='/campainPage' element={<ProtectedRoutes><Campain /></ProtectedRoutes>} />
        {/* HERE IS THE ADMIN */}
        <Route path='/dashboard' element={<AdminProtectedRoutes element={<Dashboard />} />} />
        <Route path='/admin/appointments' element={<AdminProtectedRoutes element={<Appointment />} />} />
        <Route path='/appointment/update/:id' element={<AdminProtectedRoutes element={<UpdateAppointment />} />} />
        <Route path='/admin/donors' element={<AdminProtectedRoutes element={<Donor />} />} />
        <Route path='/admin/create/donor' element={<AdminProtectedRoutes element={<CreateDonor />} />} />
        <Route path='/admin/update/donor/:id' element={<AdminProtectedRoutes element={<UpdateDonor />} />} />

        {/* PROFILE LOGIN */}
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
