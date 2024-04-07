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


export const AdminOverview = () => {
    const {users, materials, questions, setUsers, setMaterials, setQuestions,  isLoggedIn} = useUserStore();
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
                setUsers(res.data.data)
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
                setMaterials(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get("https://ncs-cbt-api.onrender.com/exam/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log(res.data)
                setQuestions(res.data.data)
                // console.log(materials)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/admin')
        }
    }, []);
    console.log(users, materials, questions);

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
        </div>
    );
};