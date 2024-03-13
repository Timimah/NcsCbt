import React, { useState } from 'react';
import { Header } from '../../../components/user/Header';
import { materials } from '../../../components/user/materials';
import { Button } from '../../../components/shared/Button';
import quiz from '../../../assets/quiz.png';
import { Modal } from '../../../components/shared/Modal';
import { Chart } from '../../../components/user/Chart';
// import useStore from './store'; // Import your Zustand store

const cards = [
    {
        icon: '👥',
        value: 75,
        label: 'Total User',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        iconBgColor: 'bg-green-500',
        iconTextColor: 'text-white',
    },
    {
        icon: '👥',
        value: 128,
        label: 'Total subscriber',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        iconBgColor: 'bg-blue-500',
        iconTextColor: 'text-white',
    },
    {
        icon: '🎫',
        value: 357,
        label: 'Total Subscription',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-600',
        iconBgColor: 'bg-orange-500',
        iconTextColor: 'text-white',
    },
    {
        icon: '📝',
        value: 65,
        label: 'Total Examinee',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        iconBgColor: 'bg-purple-500',
        iconTextColor: 'text-white',
    },
];

export const AdminOverview = ({ title, username }) => {
    const [showModal, setShowModal] = useState(false);
    //   const { username, userAvatar } = useStore((state) => state);
    // Sort materials by rating in descending order
    const sortedMaterials = materials.sort((a, b) => b.rating - a.rating);

    // Get the top 4 materials with the highest rating
    const topMaterials = sortedMaterials.slice(0, 4);

    return (
        <div className="flex flex-col w-full p-10">
            <Header title="Dashboard" username="Bedlam" />
            <main className="flex-grow">
                <div className="flex justify-between p-5">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`${card.bgColor} ${card.textColor} rounded-lg shadow-md p-4 flex items-center space-x-4 w-64`}
                        >
                            <div
                                className={`${card.iconBgColor} ${card.iconTextColor} rounded-full p-3 flex items-center justify-center`}
                            >
                                <span className="text-2xl">{card.icon}</span>
                            </div>
                            <div>
                                <div className="font-bold text-xl">{card.value}</div>
                                <div className="text-sm">{card.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Test Overview</h2>
                    <div className='bg-white'>
                        <Chart />
                    </div>
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