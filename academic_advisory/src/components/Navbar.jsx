import React, { use, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import heroImg from '../assets/heroImg.png';
import dropDownIcon from '../assets/dropdown_icon.svg';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showMenu, setShowMenu] = useState(false);

  const role = token ? jwtDecode(token).role : null;

  return (
    <div className='flex justify-evenly items-center py-4 gap-4 shadow sticky top-0 z-20 backdrop-blur-xl'>
      <h1 className='text-2xl font-bold text-blue-600'>Academic Advisory</h1>

      <div className='flex gap-10 items-center transition duration-300'>
        <Link to="/" className='text-gray-600 hover:text-blue-600 hover:border-b'>Home</Link>
        <Link to="/all-advisors" className='text-gray-600 hover:text-blue-600 hover:border-b'>All Advisors</Link>
        <Link to="/about" className='text-gray-600 hover:text-blue-600 hover:border-b'>About</Link>
      </div>

      <div>
        {
          token ?
            <div className='flex gap-1 items-center cursor-pointer relative' onClick={() => setShowMenu(!showMenu)}>
              <img className='w-10 border-2 rounded-full border-zinc-400' src={heroImg} alt="" />
              <img className='w-2.5' src={dropDownIcon} alt="" />
              <div className={`absolute top-12 right-0 bg-white border text-gray-600 text-sm border-zinc-300 rounded shadow-lg p-4 w-45 ${showMenu ? 'block' : 'hidden'}`} >
                <p onClick={() => { navigate(`/profile`) }}>My Profile</p>
                {
                  role === 'student' ? <p onClick={() => { navigate(`/student-bookings`) }}>My Appointments</p> : <p onClick={() => { navigate(`/advisor-bookings`) }}>My Appointments</p>
                }
                <p onClick={() => { toast.success('Logged out successfully!'); setToken(null); localStorage.removeItem('token'); navigate('/login') }}>Logout</p>
              </div>
            </div>
            : location.pathname === '/advisor-login' 
              ? <button onClick={() => navigate('/login')} className='bg-blue-600 text-sm text-white py-2 px-4 rounded-md hover:bg-blue-700' >Switch to Student</button>
              : <button onClick={() => navigate('/advisor-login')} className='bg-blue-600 text-sm text-white py-2 px-4 rounded-md hover:bg-blue-700' >Switch to Advisor</button>
        }
      </div>

    </div>
  )
}

export default Navbar