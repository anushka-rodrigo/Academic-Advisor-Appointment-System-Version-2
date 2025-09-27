import React, { use, useContext, useEffect, useState } from 'react'
import teacherImg from '../assets/teacher.jpg';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const StudentBookings = () => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState('');

  const { advisors } = useContext(AppContext);

  const token = localStorage.getItem('token');

  const decoded = jwtDecode(token);
  if (!decoded) {
    toast.error('Invalid token. Please log in again.');
    return;
  }
  const studentId = decoded.studentId;

  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await fetch(`http://localhost:5500/api/v1/student/booked-sessions/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong.');
        return;
      }

      setBookings(data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5500/api/v1/student/cancel-session/${bookingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong.');
        return;
      }
      // Refresh bookings after cancellation
      getBookings();
      setShowCancelConfirmation('');
      toast.success('Booking canceled successfully.');
    } catch (error) {
      toast.error('Error canceling booking. Please try again later.');
      console.error('Error canceling booking:', error);
    }
  }

  useEffect(() => {
    getBookings();
  }, []);


  return (
    <div>
      <div className='pt-3 mx-[15%]'>
        <p className='text-lg text-zinc-700'>My Appointments</p>
        <hr className='my-2 border border-gray-300' />
        <div>
          {bookings && bookings.length > 0 ? bookings.map((booking) => {

            //Find advisor details from advisors list using advisorId
            const advisor = advisors.find(advisor => advisor._id === booking.advisorId);

            return (
              <div key={booking._id} className='grid grid-cols-3 gap-4 my-4 p-4 border rounded'>
                <img className='w-40 h-40 rounded' src={teacherImg} alt="" />
                <div className='flex flex-col justify-evenly'>
                  <p className='font-bold text-lg'>{advisor.firstName} {advisor.lastName}</p>
                  <p className='text-sm text-gray-600'>{advisor.subject}</p>
                  <p className='text-xs text-gray-600'><span className='text-zinc-800'>Date:</span> {format(new Date(booking.date), ' MMMM do yyyy')}</p>
                  <p className='text-xs text-gray-600'><span className='text-zinc-800'>Time:</span> {booking.time}</p>
                </div>

                {
                  booking.status === 'cancelled' 
                  ? <p className='text-red-500 font-bold text-center mt-10'>This appointment has been cancelled.</p> 
                  : <div className='flex flex-col justify-evenly'>
                    <button className='bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded w-[300px]'>Join Session</button>
                    <button className='bg-red-500 text-white hover:bg-red-600 transition-all duration-300 py-2 px-4 rounded w-[300px]' onClick={() => setShowCancelConfirmation(booking._id)}>Cancel Appointment</button>
                  </div>
                }


                {showCancelConfirmation === booking._id && (
                  <div className=' shadow-xl bg-zinc-100 p-4 rounded fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <p className='text-lg font-bold'>{advisor.firstName} {advisor.lastName}</p>
                    <p className='text-sm text-gray-600'>{advisor.subject}</p>
                    <p className='text-xs text-gray-600'>{format(new Date(booking.date), 'MMMM do yyyy')} at {booking.time}</p>
                    <p className='py-2'>Are you sure you want to cancel this appointment?</p>
                    <button className='bg-red-500 text-white hover:bg-red-600 transition-all duration-300 py-2 px-4 rounded mt-2' onClick={() => handleCancelBooking(booking._id)}>Yes, Cancel</button>
                    <button className='bg-gray-300 text-black hover:bg-gray-400 transition-all duration-300 py-2 px-4 rounded mt-2 ml-2' onClick={() => setShowCancelConfirmation('')}>No, Go Back</button>
                  </div>
                )}
              </div>
            )
          }) : <p>No bookings found.</p>
          }

        </div>
      </div>
    </div>
  )
}

export default StudentBookings