import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AdvisorBookings = () => {

  const token = localStorage.getItem('token');

  const [appointments, setAppointments] = useState([]);

  // Fetch bookings for this advisor using advisorId
  const fetchBookings = async () => {
    try {
      const res = await fetch(`http://localhost:5500/api/v1/advisor/sessions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        toast.error('Failed to fetch appointments');
        return;
      }

      const data = await res.json();
      setAppointments(data.data);

    } catch (error) {
      toast.error('An error occurred while fetching appointments');
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className='pt-3 mx-[15%]'>
      <div>
        <h1 className='text-xl font-bold text-center mt-5'>Appointments</h1>
        <hr className='my-2 border-blue-500' />
        <div className='my-10 grid grid-cols-3 gap-4'>
          {/* Render appointments here */}
          {
            appointments.length === 0 ? <p className='text-center mt-5'>No appointments found.</p>
              :
              appointments.map((appointment) => (
                <div key={appointment._id} className="border border-gray-400 rounded p-4 mb-4">
                  <h2>{format(new Date(appointment.date), 'dd MMMM yyyy')}</h2>
                  <h2 className="text-sm text-gray-500">{appointment.time}</h2>
                  {
                    appointment.status === 'cancelled'?  <p className="text-sm text-red-600">•{appointment.status}</p> : <p className="text-sm text-green-600">•{appointment.status}</p>
                  }

                  {
                    appointment.status === 'cancelled' 
                    ? <p className='text-red-500 font-bold text-center mt-4'>This appointment has been cancelled.</p> 
                    : <div className="mt-2">
                      <button className="text-blue-500 border border-blue-500 rounded px-2 py-1 text-sm hover:bg-blue-500 hover:text-white transition-all duration-300">Start Session</button>
                      <button className="text-red-500 border border-red-500 rounded px-2 py-1 text-sm ml-2 hover:bg-red-500 hover:text-white transition-all duration-300">Cancel Session</button>
                    </div>
                  }

                </div>
              ))
          }

        </div>
      </div>
    </div>
  )
}

export default AdvisorBookings