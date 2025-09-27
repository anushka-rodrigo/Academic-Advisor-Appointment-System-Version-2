import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import teacherImage from '../assets/teacher.jpg';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Appointment = () => {

  const { advisors } = useContext(AppContext);

  const { advisorId } = useParams();

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [advisor, setAdvisor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch advisor details using advisorId
  const getAdvisorDetails = () => {
    const advisor = advisors.find((advisor) => advisor._id === advisorId);
    setAdvisor(advisor);
  }

  const getAvailableSlots = async () => {
    setSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date for next 7 days
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //set start time 10:00 AM and end time 8:00 PM
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        //increment time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setSlots(prev => ([...prev, timeSlots]));
    }
  }

  const handleBookAppointment = async () => {
    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    //book appointment logic
    try {
      const token = localStorage.getItem('token');

      const decoded = jwtDecode(token);
      if (!decoded) {
        toast.error('Invalid token. Please log in again.');
        return;
      }
      const studentId = decoded.studentId;

      const res = await fetch('http://localhost:5500/api/v1/student/book-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          advisorId: advisor._id,
          studentId: studentId,
          date: slots[slotIndex][0].datetime.toDateString(),
          time: slotTime
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong.');
        return;
      }

      toast.success(`Appointment booked with ${advisor.firstName} ${advisor.lastName} on ${slots[slotIndex][0].datetime.toDateString()} at ${slotTime}`);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again later.');
    }

    //reset slot selection
    setSlotTime("");
    setSlotIndex(0);

    //refresh available slots
    getAvailableSlots();

  }

  useEffect(() => {
    getAvailableSlots();
  }, [advisor]);

  useEffect(() => {
    getAdvisorDetails();
  }, [advisorId, advisors]);

  return advisor && (
    <div>
      <div className='flex justify-evenly items-center my-10 mx-55 gap-4'>
        <div>
          <img className='w-92 rounded' src={teacherImage} alt="" />
        </div>
        <div className='flex-1 border p-4 rounded border-gray-300 w-96'>
          <p className='font-bold text-3xl'>{advisor.firstName} {advisor.lastName}</p>
          <p className='text-md text-gray-500'>{advisor.subject}</p>
          <div className='mt-4'>
            <p className='font-medium text-gray-700 text-sm'>Booking Slots</p>
            <div className='flex gap-3 items-center w-full mt-3'>
              {
                slots.length && slots.map((item, index) => (
                  <div onClick={() => { setSlotIndex(index); }} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`} key={index}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))
              }
            </div>
            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
              {slots.length && slots[slotIndex].map((item, index) => (
                <p onClick={() => { setSlotTime(item.time); }} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'border border-gray-300 text-gray-600'}`} key={index}>
                  {item.time.toLowerCase()}
                </p>
              ))}
            </div>

            <button onClick={handleBookAppointment} className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-blue-600 transition-all duration-300'>Book Appointment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment