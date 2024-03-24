import React, { useState } from 'react'
import { Table } from '../../../components/shared/Table';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button'
import { Modal } from '../../../components/shared/Modal'
import { useAdminStore } from '../../../store/adminStore';
import { useUserStore } from '../../../store/userStore';
import { OverviewCard } from '../../../components/admin/OverviewCard';
import user from '../../../assets/user.png'
import adminn from '../../../assets/user.png'
import success from '../../../assets/upload.png'

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

const adminHeader = [
    { key: 'id', label: 'S/N' },
    { key: 'name', label: 'Name' },
    { key: 'adminEmail', label: 'Email Address' },
    { key: 'phoneNumber', label: 'Phone Number' },
]

const userHeader = [
    { key: 'id', label: 'S/N' },
    { key: 'examineeId', label: 'Examinee ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'userEmail', label: 'Email Address' },
    { key: 'phoneNumber', label: 'Phone Number' },

    // Add any other relevant columns for users
]


export const User = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("admin");
    const [handleCreate, setHandleCreate] = useState(false);
    const { createAdmin, admin } = useAdminStore();
    const { users } = useUserStore();
    console.log(admin)

    const cards = [
        {
            icon: user,
            value: users.length,
            label: 'Users',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            iconBgColor: 'bg-green-500',
            iconTextColor: 'text-white',
        },
        {
            icon: adminn,
            value: admin.length,
            label: 'Admins',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            iconBgColor: 'bg-blue-500',
            iconTextColor: 'text-white',
        }
    ]

    const [name, setName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

    const handleSubmit = () => {
        let isValid = true;
        if (!name.trim()) {
            setNameError("Name is required");
            isValid = false;
        } else {
            // Check if the id already exists in the users array
            const userExists = admin.some((a) => a.name === name);
            if (userExists) {
                setNameError("Name already exists");
                isValid = false;
            }
        }
        if (!adminEmail.trim()) {
            setEmailError("Email is required");
            isValid = false;
        }
        if (!phoneNumber.trim()) {
            setPhoneNumberError("Phone Number is required");
            isValid = false;
        } else {
            setPhoneNumberError("");
        }
        if (!adminPassword.trim()) {
            setPasswordError("Password is required");
            isValid = false;
        }


        if (isValid) {
            const adminData = { name, adminEmail, phoneNumber, adminPassword };
            createAdmin(adminData);
            setName("");
            setAdminEmail("");
            setPhoneNumber("");
            setAdminPassword("");
            console.log("Admin created successfully");
            setShowModal(false);
            setHandleCreate(true)
        }
    };


    return (
        <div className="flex flex-col w-full p-10 gap-4">
            <Header title="Dashboard" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    <div className="flex mb-4 justify-between items-center gap-8 h-14">
                        <div className="relative flex w-2/3">
                            <input
                                type="text"
                                className="border rounded-md py-3 px-4 w-full"
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
                        <div className="flex justify-between w-1/3 gap-4">
                            {cards.map((card, index) => (
                                <div key={index} className='w-full'>
                                    <OverviewCard
                                        cardStyles="justify-center py-3"
                                        cardClick={() => {
                                            if (card.label === "Admin") {
                                                console.log("Admin")
                                                setActiveTab("admin");
                                            } else {
                                                console.log("User")
                                                setActiveTab("user");
                                            }
                                        }}
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
                    </div>
                    <div className='flex justify-end'>
                        {activeTab === "admin" ? <Button title="Create Admin" btnStyles="px-4 py-3 bg-primary rounded-md text-white" btnClick={() => setShowModal(!showModal)} /> : ""}
                    </div>
                    <div className="px-4 w-full">
                        {/* {activeTab === "user" && <Table data={users} columns={userHeader}/>} */}
                        {activeTab === "user" && <Table data={users.length > 0 ? users.map((user, index) => ({ ...user, id: index + 1 })) : [{ id: 1, name: 'No users' }]} columns={userHeader} />}
                        {activeTab === "admin" && <Table data={admin.length > 0 ? admin.map((admin, index) => ({ ...admin, id: index + 1 })) : [{ id: 1, name: 'No admins' }]} columns={adminHeader} />}
                    </div>
                </section>
            </main>
            {showModal &&
                <Modal 
                closeModal={() => setShowModal(false)}
                title="Create Admin" content={
                    <div className='flex flex-col items-center gap-4 my-2'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="adminName">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value); setNameError(""); }}
                                className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${nameError ? "border-red-500" : ""
                                    }`}
                                placeholder="Name"
                            />
                            {nameError && <div className="text-sm text-red-500">{nameError}</div>}
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                value={adminEmail}
                                onChange={(e) => { setAdminEmail(e.target.value); setEmailError(""); }}
                                className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${emailError ? "border-red-500" : ""
                                    }`}
                                placeholder="Enter Email Address"
                            />
                            {emailError && <div className="text-sm text-red-500">{emailError}</div>}
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberError(""); }}
                                className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${phoneNumberError ? "border-red-500" : ""
                                    }`}
                                placeholder="Enter Phone Number"
                            />
                            {phoneNumberError && <div className="text-sm text-red-500">{phoneNumberError}</div>}
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="adminpassword">Password</label>
                            <input
                                type="password" value={adminPassword}
                                onChange={(e) => { setAdminPassword(e.target.value); setPasswordError(""); }}
                                className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${passwordError ? "border-red-500" : ""
                                    }`}
                                placeholder="Enter Password"
                            />
                            {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}
                        </div>
                    </div>
                }
                    buttons={
                        <Button title="Create Admin" btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5" btnClick={handleSubmit} />
                    }
                    modStyles="bg-secondary w-1/2"
                />
            }
            {handleCreate &&
                <Modal
                    content={
                        <div className='flex flex-col gap-4 items-center justify-center py-10'>
                            <div className='motion-safe:animate-bounce duration-75'><img src={success} alt="sucess" /></div>
                            <div className='text-primary text-3xl font-bold text-center'>Admin created Successfully!</div>
                        </div>
                    }
                    buttons={
                        <Button title="Done" btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full" btnClick={() => setHandleCreate(false)} />
                    }
                    modStyles="bg-secondary w-1/2 transition duration-300 ease-in-out"
                />
            }
        </div>
    )
}