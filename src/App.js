import './App.css';
import { Landing, Register, Error, ProtectedRoute} from './pages'; 

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import AddJob from './pages/dashboard/AddJob'
import {AllJobs} from './pages/dashboard/AllJobs'
import {Stats} from './pages/dashboard/Stats'
import {Profile} from './pages/dashboard/Profile'
import { SharedLayout } from "./pages/dashboard/SharedLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} /> 
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
