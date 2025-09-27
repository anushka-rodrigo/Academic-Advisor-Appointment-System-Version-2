import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [advisors, setAdvisors] = useState([]);

    const fetchAdvisors = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/v1/student/advisors');
            const data = await response.json();
            setAdvisors(data.data);
        } catch (error) {
            console.error('Error fetching advisors:', error);
        }
    };
    

    useEffect(() => {
        fetchAdvisors();
    }, []);

    return (
        <AppContext.Provider value={{ advisors }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider