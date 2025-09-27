import React from 'react'
import heroImage from '../assets/heroImg.png';

const Hero = () => {
    return (
        <div className='px-40 py-15'>
            <div className='w-full flex flex-row items-center justify-center bg-blue-100 rounded-lg'>
                <div className='flex-1 pl-20'>
                    <h2 className='text-6xl font-black mb-4'>Welcome to the <span className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-transparent bg-clip-text'>Academic Advisory</span></h2>
                    <p className='mt-2 text-gray-600 text-[15px]'>Your one-stop solution for academic guidance and course selection.</p>
                    <button className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>Get Started</button>
                </div>
                <div className='flex-1 p-4 relative'>
                    <img className='w-full h-auto' src={heroImage} alt="Hero" />
                </div> 
            </div>
        </div>
    )
}

export default Hero;