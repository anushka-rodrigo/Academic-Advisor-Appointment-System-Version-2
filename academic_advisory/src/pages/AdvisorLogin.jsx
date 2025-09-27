import { se } from 'date-fns/locale';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AdvisorLogin = () => {

    const [state, setState] = useState('Login');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = state === 'Sign Up' ? 'http://localhost:5500/api/v1/auth/advisor/register' : 'http://localhost:5500/api/v1/auth/advisor/login';

        const body = state === 'Sign Up' ? {firstName, lastName, email, subject, password } : { email, password };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                toast.error(data.message || 'An error occurred. Please try again later.');
                return;
            }

            const data = await res.json();

            const token = data.data.token;
            if (!token) {
                toast.error('No token received from server');
                return;
            }

            // Store the token in localStorage
            localStorage.setItem('token', token);
            toast.success(state === 'Sign Up' ? 'Registered successfully!' : 'Logged in successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        }

    }

    return (
        <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-1 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl border border-zinc-300 text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl text-center'>{state === 'Sign Up' ? 'Advisor Sign Up' : 'Advisor Login'}</p>
                <p className='text-zinc-500'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments</p>
                {
                    state === 'Sign Up' && (
                        <>
                            <div className='w-full'>
                                <p>Full Name</p>
                                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className='w-full'>
                                <p>Last Name</p>
                                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className='w-full'>
                                <p>Subject</p>
                                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            </div>
                        </>
                    )
                }
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit' className='bg-blue-600 text-white w-full text-sm font-light px-14 py-3 rounded my-2 hover:bg-blue-700 transition-all duration-300'>{state === 'Sign Up' ? 'Sign Up' : 'Login'}</button>
                {
                    state === 'Sign Up' ? (
                        <p className='text-xs'>Already have an account? <span onClick={() => setState('Login')} className='text-blue-600 cursor-pointer underline'>Login</span></p>
                    ) : (
                        <p className='text-xs'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-blue-600 cursor-pointer underline'>Sign Up</span></p>
                    )
                }
            </div>
        </form>
    )
}

export default AdvisorLogin