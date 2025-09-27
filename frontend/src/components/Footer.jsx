import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='bg-slate-50 text-white p-8 flex justify-around'>
                <div>
                    <h2 className='text-2xl font-bold text-blue-600'>Academic Advisory</h2>
                    <p className='text-gray-600 text-sm mt-3'>Discover the path to academic excellence with our expert guidance <br /> with personalized support.</p>
                </div>
                <div>
                    <h2 className='text-lg font-bold text-blue-600'>Quick Links</h2>
                    <ul className='text-gray-600 text-sm mt-2'>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/all-advisors">All Advisors</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg font-bold text-blue-600'>Contact Us</h2>
                    <p className='text-gray-600 text-sm mt-2'>+94 123 456 789</p>
                    <p className='text-gray-600 text-sm mt-2'>info@academicadvisory.com</p>
                </div>
            </div>
            <hr className='w-4/5 border-gray-300 mx-auto' />
            <div className='text-white p-2 text-center bg-slate-50'>
                <p className='text-sm text-gray-600 mb-2'>© 2023 Academic Advisory. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;