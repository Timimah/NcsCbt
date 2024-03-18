import React, { useState } from 'react'
import { Table } from '../../../components/shared/Table';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button'
import { Modal } from '../../../components/shared/Modal'

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'paymentID', label: 'Payment ID' },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'paymentDate', label: 'Date' },
];

const examineeData = [
    {
        id: 1,
        examineeId: 'NCS/2021/001',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        checkinTime: '12:00 PM'
    },
    {
        id: 2,
        examineeId: 'NCS/2021/002',
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        checkinTime: '12:00 PM'
    },
    {
        id: 3,
        examineeId: 'NCS/2021/003',
        name: 'Doe John',
        email: 'doejon@gmail.com',
        checkinTime: '12:00 PM'
    },
    {
        id: 1,
        examineeId: 'NCS/2021/001',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        checkinTime: '12:00 PM'
    },
    {
        id: 2,
        examineeId: 'NCS/2021/002',
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        checkinTime: '12:00 PM'
    },
    {
        id: 3,
        examineeId: 'NCS/2021/003',
        name: 'Doe John',
        email: 'doejon@gmail.com',
        checkinTime: '12:00 PM'
    }
]

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
    }
]

export const Payment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const regex = new RegExp(term, 'i');
        // const filteredMaterials = materials.filter((material) =>
        //     regex.test(material.title)
        // );

        // if (filteredMaterials.length === 1) {
        //     setDisplayedMaterials(filteredMaterials);
        // } else {
        //     setDisplayedMaterials(filteredMaterials.slice(0, 8));
        // }
        console.log('doesn\'t work just yet');
    };

    return (
        <div className="flex flex-col w-full p-10 gap-4">
            <Header title="Dashboard" username="Bedlam" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    <div className="flex mb-4 justify-between gap-8 h-14">
                        <div className="relative flex w-2/3">
                            <input
                                type="text"
                                className="border rounded-md py-2 px-4 w-full"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 w-full">
                        <Table data={examineeData} columns={columns} />
                    </div>
                </section>
            </main>
        </div>
    )
}