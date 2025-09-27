import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AdvisorCard from '../components/AdvisorCard';

const AllAdvisors = () => {

    const {advisors} = useContext(AppContext);

    return (
        <div className='flex mx-4 pt-3 sm:mx-[10%] gap-4'>
            <div className='w-xs'>
                <h2 className='text-md font-bold ml-3'>All Advisors</h2>
                <p className='border-2 rounded-sm  border-gray-300 p-2 m-2 text-sm text-gray-600 hover:bg-gray-100 hover:scale-102 transition-all duration-200'>Programming</p>
                <p className='border-2 rounded-sm  border-gray-300 p-2 m-2 text-sm text-gray-600 hover:bg-gray-100 hover:scale-102 transition-all duration-200'>Database Management</p>
                <p className='border-2 rounded-sm  border-gray-300 p-2 m-2 text-sm text-gray-600 hover:bg-gray-100 hover:scale-102 transition-all duration-200'>Web Development</p>
                <p className='border-2 rounded-sm  border-gray-300 p-2 m-2 text-sm text-gray-600 hover:bg-gray-100 hover:scale-102 transition-all duration-200'>Cyber Security</p>
                <p className='border-2 rounded-sm  border-gray-300 p-2 m-2 text-sm text-gray-600 hover:bg-gray-100 hover:scale-102 transition-all duration-200'>Cloud Computing</p>
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {
                    advisors.map((advisor) => (
                        <AdvisorCard key={advisor._id} advisors={advisor} />
                    ))
                }
            </div>
        </div>
    )
}

export default AllAdvisors; 