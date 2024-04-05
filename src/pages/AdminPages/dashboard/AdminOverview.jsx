import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { materials } from '../../../components/user/materials';
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal';
import { Chart } from '../../../components/user/Chart';
import user from '../../../assets/user.png'
import adminn from '../../../assets/user.png'
import subscription from '../../../assets/sub.png'
import examinee from '../../../assets/examinee.png'
import { OverviewCard } from '../../../components/admin/OverviewCard';
import { useUserStore } from '../../../store/userStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import useStore from './store'; // Import your Zustand store


export const AdminOverview = () => {
    const {users, materials, setUsers, setMaterials, isLoggedIn} = useUserStore();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const cards = [
        {
            icon: user,
            value: users.length,
            label: 'Total User',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            iconBgColor: 'bg-green-500',
            iconTextColor: 'text-white',
        },
        {
            icon: adminn,
            value: 0,
            label: 'Total Admin',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            iconBgColor: 'bg-blue-500',
            iconTextColor: 'text-white',
        },
        {
            icon: subscription,
            value: 0,
            label: 'Total Subscriptions',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            iconBgColor: 'bg-green-500',
            iconTextColor: 'text-white',
        },
        {
            icon: examinee,
            value: 0,
            label: 'Total Examinee',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            iconBgColor: 'bg-blue-500',
            iconTextColor: 'text-white',
        }
    ]

    useEffect(() => {
        const token = localStorage.getItem("auth-token")
        if (isLoggedIn) {
            axios.get("https://ncs-cbt-api.onrender.com/admin/getUsers", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => {
                console.log("Getting details...")
                setUsers(res.data.data)
                // console.log(users)
            })
            .catch((err) => {
                console.log(err)
            })

            axios.get("https://ncs-cbt-api.onrender.com/material/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log(res.data)
                setMaterials(res.data.data)
                // console.log(materials)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/admin')
        }
    }, []);
    console.log(users, materials);

    const sortedMaterials = materials.sort((a, b) => b.rating - a.rating);

    // Get the top 4 materials with the highest rating
    const topMaterials = sortedMaterials.slice(0, 4);

    return (
        <div className="flex flex-col w-full p-10">
            <Header title="Dashboard" />
            <main className="flex-grow">
                <div className="flex justify-around gap-6 p-5">
                    {cards.map((card, index) => (
                        <div key={index} className='w-fit'>
                            <OverviewCard
                                cardStyles="p-6"
                                label={card.label}
                                cardValue={card.value}
                                icon={
                                    <>
                                        <img className='w-10' src={card.icon} alt={card.icon} />
                                    </>
                                }
                            />
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
                    closeModal={() => setShowModal(false)}
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