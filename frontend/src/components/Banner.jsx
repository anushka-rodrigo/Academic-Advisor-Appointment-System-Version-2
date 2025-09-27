import React from 'react'
import bannerImage from '../assets/bannerImg.png';

const Banner = () => {
  return (
    <div className='flex flex-row bg-blue-100 justify-evenly gap-40 items-center p-4 rounded-md mx-40 my-20'>
        <div className='flex flex-col gap-5 pl-8'>
            <p className='text-4xl text-gray-600'>Join us today and take the first step <br/> towards academic success!</p>
            <button className='bg-blue-600 max-w-40 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300'>Create Account</button>
        </div>
        <div>
            <img className='w-90 relative top-4 left-0 z-10' src={bannerImage} alt="BannerImg" />
        </div>
    </div>
  )
}

export default Banner