import React from 'react'
import teacherImage from '../assets/teacher.jpg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdvisorCard = ({ advisors }) => {

  const token = localStorage.getItem('token');

  const role = token ? jwtDecode(token).role : null;

  const navigate = useNavigate();

  if (!advisors || advisors.length === 0) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col w-60 bg-white border border-gray-200 rounded-lg shadow-md m-4 hover:scale-102 transition-transform duration-300">
        <img className="w-60 h-50 object-cover rounded-t-xl" src={teacherImage} alt="Teacher"/>
        <div className="p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold">{advisors.firstName} {advisors.lastName}</h3>
            <p className="text-sm text-gray-600">{advisors.subject}</p>
            {
              role === 'student' && (
                <button onClick={() => navigate(`/appointment/${advisors._id}`)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200">Book Session</button>
              )
            }
        </div>
    </div>
  )
}

export default AdvisorCard