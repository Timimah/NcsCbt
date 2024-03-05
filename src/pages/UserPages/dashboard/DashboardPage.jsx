import React, { useState } from 'react';
import { Header } from '../../../components/user/Header';
import { materials } from '../../../components/user/materials';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
// import useStore from './store'; // Import your Zustand store

export const DashboardPage = ({ title, username }) => {
    const [showModal, setShowModal] = useState(false);
    //   const { username, userAvatar } = useStore((state) => state);
    // Sort materials by rating in descending order
    const sortedMaterials = materials.sort((a, b) => b.rating - a.rating);

    // Get the top 4 materials with the highest rating
    const topMaterials = sortedMaterials.slice(0, 4);

    return (
        <div className="flex flex-col w-full">
            <Header title="Dashboard" username="Bedlam" />
            <main className="flex-grow p-6">
                <section>
                    <h2 className="text-lg mb-4 text-darkgrey">Top Materials to Read</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        {topMaterials.map((material) => (
                            <div key={material.id} className='p-4 text-darkgrey'>
                                <img
                                    src={material.coverImage}
                                    alt={material.title}
                                    className='w-full h-40 object-cover rounded-md mb-2'
                                />
                                <h3 className='mb-1'>{material.title}</h3>
                                <div className='flex items-center'>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill={index < material.rating ? '#fbbf24' : '#e2e8f0'}
                                            className='w-5 h-5'
                                        >
                                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                                        </svg>
                                    ))}
                                </div>
                                <span>{material.rating}/5</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-yellow-200 rounded-lg p-6 mt-8 flex items-center">
                    <div className="w-1/2 flex flex-col gap-4 text-left">
                        <h2 className="text-xl mb-4">Take Quiz to Test Your Knowledge</h2>
                        <Button title="Take Exam" btnStyles="bg-primary text-white py-2 px-4 rounded-md w-fit" btnClick={() => setShowModal(true)} />
                    </div>
                    <img className='object-contain' src={quiz} alt="Quiz" />
                </section>
                <section className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Test Overview</h2>
                    {/* Add your chart component here */}
                </section>
            </main>
            {showModal &&
                <Modal
                    title="Quiz Settings"
                    content={
                        <div className='text-left mt-4'>
                            <div>
                                <label className="block py-1 -mb-1">Number of Questions</label>
                                <input type="tel" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="30" />
                                <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
                            </div>
                            <div>
                                <label className="block py-1 -mb-1">Set Time</label>
                                <input type="text" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="5 min" />
                                <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
                            </div>
                            <div>
                                <label className="block py-1 -mb-1">Select Rank</label>
                                <input type="text" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Select Rank" />
                                <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
                            </div>
                        </div>
                    }
                    modStyles="w-1/3 h-fit bg-secondary text-center" 
                    buttons={<Button title="Start Quiz" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full" btnClick={() => setShowModal(false)} />}
                />
            }
        </div>
    );
};