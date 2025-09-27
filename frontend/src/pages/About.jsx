import React from 'react'
import aboutImg from '../assets/aboutImg.png'

const About = () => {
  return (
    <div className='pt-3 mx-[15%] grid grid-cols-2 gap-10 my-5'>
      <div >
        <img className='w-100 h-100 object-cover bg-blue-100 rounded-lg' src={aboutImg} alt="About Us" />
      </div>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-transparent bg-clip-text'>About Us</h1>
        <p className='mt-5 text-justify text-gray-500'>
          Welcome to our Academic Advisory platform! We are dedicated to connecting students with experienced academic advisors to help them navigate their educational journey. Our mission is to provide personalized guidance and support to ensure students achieve their academic goals.
          <br /><br />
          Our team of advisors is composed of professionals with diverse backgrounds and expertise in various academic fields. They are committed to offering valuable insights, helping students make informed decisions about their courses, career paths, and overall academic experience.
          <br /><br />
        </p>
      </div>
    </div>
  )
}

export default About