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
import TransfusionPage from './pages/user/Transfusion/TransfusionPage';
import Campain from './pages/user/Campain/Campain';
import Appointment from './pages/admin/Appointment/Appointment';
import UpdateAppointment from './pages/admin/Appointment/UpdateAppointment';
import Donor from './pages/admin/Donor/Donor';
import CreateDonor from './pages/admin/Donor/CreateDonor';
import UpdateDonor from './pages/admin/Donor/UpdateDonor';
import Event from './pages/admin/Event/Event';
import CreateEvent from './pages/admin/Event/CreateEvent';
import UpdateEvent from './pages/admin/Event/UpdateEvent';
import Incentives from './pages/user/Incentives';
import UpdateProfile from './pages/user/UpdateProfile';
import Gmaps from './pages/Gmaps';
import Forum from './pages/Forum/Forum';
import ThePad from './pages/Forum/ThePad';
import HowToDonate from './pages/Forum/Pad/HowToDonate';
import HowToTransfuse from './pages/Forum/Pad/HowToTransfuse';
import TheIncentives from './pages/Forum/Pad/TheIncentives';
import EditAppointment from './pages/user/Appointment/EditAppointment';

function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        {/* HERE IS THE USER ONLY */}
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/profileDescription' element={<ProtectedRoutes><ProfileDescription /></ProtectedRoutes>} />
        <Route path='/donationPage' element={<ProtectedRoutes><DonationPage /></ProtectedRoutes>} />
        <Route path='/transfusionPage' element={<ProtectedRoutes><TransfusionPage /></ProtectedRoutes>} />
        <Route path='/campainPage' element={<ProtectedRoutes><Campain /></ProtectedRoutes>} />
        <Route path='/user/appointments' element={<ProtectedRoutes><Incentives /></ProtectedRoutes>} />
        <Route path='/user/update-profile/:id' element={<ProtectedRoutes><UpdateProfile /></ProtectedRoutes>} />
        <Route path='/google-map' element={<ProtectedRoutes><Gmaps /></ProtectedRoutes>} />
        <Route path='/blood/forum' element={<ProtectedRoutes><Forum /></ProtectedRoutes>} />
        <Route path='/blood/forum/the-pad' element={<ProtectedRoutes><ThePad /></ProtectedRoutes>} />
        <Route path='/blood/forum/the-pad/how-to-donate' element={<ProtectedRoutes><HowToDonate /></ProtectedRoutes>} />
        <Route path='/blood/forum/the-pad/how-to-transfuse' element={<ProtectedRoutes><HowToTransfuse /></ProtectedRoutes>} />
        <Route path='/blood/forum/the-pad/what-is-the-incentives' element={<ProtectedRoutes><TheIncentives /></ProtectedRoutes>} />
        <Route path='/user/appointment-edit/:id' element={<ProtectedRoutes><EditAppointment /></ProtectedRoutes>} />
        {/* HERE IS THE ADMIN */}
        <Route path='/dashboard' element={<AdminProtectedRoutes element={<Dashboard />} />} />
        <Route path='/admin/appointments' element={<AdminProtectedRoutes element={<Appointment />} />} />
        <Route path='/appointment/update/:id' element={<AdminProtectedRoutes element={<UpdateAppointment />} />} />
        <Route path='/admin/donors' element={<AdminProtectedRoutes element={<Donor />} />} />
        <Route path='/admin/create/donor' element={<AdminProtectedRoutes element={<CreateDonor />} />} />
        <Route path='/admin/update/donor/:id' element={<AdminProtectedRoutes element={<UpdateDonor />} />} />
        <Route path='/admin/events' element={<AdminProtectedRoutes element={<Event />} />} />
        <Route path='/admin/create/event' element={<AdminProtectedRoutes element={<CreateEvent />} />} />
        <Route path='/admin/update-event/:id' element={<AdminProtectedRoutes element={<UpdateEvent />} />} />

        {/* PROFILE LOGIN */}
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
      </Routes>
    </div >
  );
}

export default App;
