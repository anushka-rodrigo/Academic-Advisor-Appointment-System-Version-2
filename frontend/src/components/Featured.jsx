import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import AdvisorCard from './AdvisorCard';

const Featured = () => {

    const { advisors } = useContext(AppContext);

    return (
        <div>
            <div className='flex justify-center items-center flex-col text-center mt-10 mb-10'>
                <h2 className='text-2xl font-bold'>Featured Advisors</h2>
                <p className='text-md text-gray-600'>Explore our featured advisors tailored for your academic journey.</p>
            </div>

            <div className='grid grid-cols-4 gap-4 px-40 mb-10'>
                {
                    advisors.slice(0, 4).map((advisor) => (
                        <AdvisorCard key={advisor._id} advisors={advisor} />
                    ))
                }
            </div>

            <div className='flex justify-center items-center m-10'>
                <button className=' py-2 px-4 rounded-md hover:bg-blue-700 hover:text-white border border-blue-600 transition-all duration-300'><Link to="/all-advisors">View All Advisors</Link></button>
            </div>

        </div>
    )
}

export default Featured;