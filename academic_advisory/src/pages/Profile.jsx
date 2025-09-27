import React, { useEffect, useState } from 'react'
import heroImg from '../assets/heroImg.png';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {

  const [userData, setUserData] = useState({
    firstName: "Ravindu",
    lastName: "Deraniyagala",
    image: heroImg,
    email: "ravindu@example.com",
    role: "student"
  });

  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem('token');

  const role = jwtDecode(token).role;

  const endPoint = role === 'student' ? 'http://localhost:5500/api/v1/student/profile' : 'http://localhost:5500/api/v1/advisor/profile';

  const getUserData = async () => {
    try {
      const userData = await fetch(endPoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!userData.ok) {
        toast.error('Failed to fetch user data');
        return null;
      }
      const data = await userData.json();
      setUserData(data.data);

    } catch (error) {
      toast.error('An error occurred while fetching user data');
      console.log('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);



  return (
    <div className='pt-3 mx-[15%]'>
      <div className='flex flex-col gap-3 p-6'>
        <img className='rounded w-50 h-50 bg-violet-50' src={userData.image} alt="" />
        {
          isEdit ? <input className='mt-2 bg-zinc-200 border border-gray-500 text-sm w-50 p-2 rounded-full' type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setUserData({ ...userData, image: reader.result });
              };
              reader.readAsDataURL(file);
            }
          }} /> : null
        }
        {
          isEdit
            ? <div className='flex gap-2'>
              <input className='mt-2 bg-zinc-100 border border-gray-500 text-sm w-50 p-2 rounded-full' type="text" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
              <input className='mt-2 bg-zinc-100 border border-gray-500 text-sm w-50 p-2 rounded-full' type="text" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
            </div>
            : <p className='text-2xl font-bold mt-2'>{userData.firstName} {userData.lastName}</p>
        }
        {
          role === 'advisor' ? <p className='text-md text-gray-500'>{userData.subject}</p> : null
        }
        <hr className='my-2 border-gray-400' />
        <div className='flex items-center gap-1'>
          <p>Email: </p>
          {
            isEdit
              ? <input className='bg-zinc-100 border border-gray-500 text-sm w-50 p-2 rounded-full' type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              : <p className='text-blue-600'>{userData.email}</p>
          }
        </div>
        <div className='flex gap-1'>
          <p>Role: </p>
          <p className='text-blue-600'>{userData.role}</p>
        </div>
        <div className='flex items-center gap-3 mt-4'>
          <button className='bg-blue-500 w-25 text-white p-2 rounded' onClick={() => setIsEdit(true)}>Edit</button>
          <button className='bg-white w-25 text-blue-500 border border-blue-500 p-2 rounded' onClick={() => setIsEdit(false)}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;