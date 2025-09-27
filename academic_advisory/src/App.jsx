import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllAdvisors from './pages/AllAdvisors';
import Login from './pages/Login';
import StudentBookings from './pages/StudentBookings';
import ProtectedRoute from './authorize/ProtectedRoute';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdvisorLogin from './pages/AdvisorLogin';
import AdvisorBookings from './pages/AdvisorBookings';
import Profile from './pages/Profile';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/advisor-login" element={<AdvisorLogin />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/all-advisors" element={<ProtectedRoute><AllAdvisors /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/student-bookings" element={<ProtectedRoute><StudentBookings /></ProtectedRoute>} />
        <Route path="/appointment/:advisorId" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/advisor-bookings" element={<ProtectedRoute><AdvisorBookings /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Routes>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  )
}

export default App;
