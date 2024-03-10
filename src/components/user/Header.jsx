import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = ({ title, username }) => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/dashboard/user-profile')
    }

    return (
        <header className="py-4 px-6 flex justify-between items-center w-full  ">
            <div className='flex flex-col gap-2'>
                <h1 className="text-3xl font-bold text-darkgrey">{title}</h1>
                <p className="text-sm text-grey">Welcome, <span>{username}</span></p>
            </div>
            <div className="flex items-center cursor-pointer" onClick={handleProfile}>
                <img alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                <div>
                    <span className='text-grey'>Hello,</span>
                    <span className='font-bold text-darkgrey'>{username}</span>
                </div>
            </div>
        </header>
    )
}