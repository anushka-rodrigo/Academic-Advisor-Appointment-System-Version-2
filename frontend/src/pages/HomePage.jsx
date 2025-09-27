import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Banner from '../components/Banner'

const HomePage = () => {
    
    return (
        <div className='relative'>
            <Hero />
            <Featured />
            <Banner />
        </div>
    )
}

export default HomePage;