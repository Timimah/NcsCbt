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
import axios from 'axios';

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

    const cards = [
        {
            icon: user,
            value: 0,
            label: 'User',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            iconBgColor: 'bg-green-500',
            iconTextColor: 'text-white',
        },
        {
            icon: adminn,
            value: 0,
            label: 'Admin',
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

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

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

    if (activeTab === "admin") {
        console.log("admin")
        const token = localStorage.getItem("auth-token");
        const getUsers = async () => {
            console.log("Loading...")
            axios.get("https://ncs-cbt-api.onrender.com/admin/getUsers", {
                headers:
                {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.status == false) {
                        localStorage.removeItem("token");
                        // navigate("/login");
                    } else {
                        console.log(res.data.data);
                    }
                }).catch((err) => {
                    console.log(err.message);
                });
        }
        getUsers();
    } else {
        console.log("user")
    }

    const handleSubmit = async () => {
        if (isValid) {
            setIsLoading(true);
            const adminData = { name, adminEmail, phoneNumber, adminPassword };
            try {
                const response = await axios.post(
                    "https://ncs-cbt-api.onrender.com/admin/register",
                    adminData,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log(response.data.status, response.data);
            } catch (err) {
                if (!err?.response) {
                    console.log(err);
                    console.log(err.message);
                } else if (err.response?.status === 409) {
                    setError(err.response.data.message);
                } else {
                    setError("Registration Failed");
                }
            }
            // createAdmin(adminData);
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
                        {/* {activeTab === "user" && <Table data={users.length > 0 ? users.map((user, index) => ({ ...user })) : [{ id: 1, name: 'No users' }]} columns={userHeader} />} */}
                        {/* {activeTab === "admin" && <Table data={admin.length > 0 ? admin.map((admin, index) => ({ ...admin, id: index + 1 })) : [{ id: 1, name: 'No admins' }]} columns={adminHeader} />} */}
                    </div>
                </section>
            </main>
            {showModal &&
                <Modal
                    closeModal={() => setShowModal(false)}
                    title="Create Admin" content={
                        <div className='flex flex-col items-center gap-4 my-2'>
                            {error && <div className="text-sm text-red-500">{error}</div>}
                            <div className='w-full flex flex-col'>
                                <label htmlFor="adminName">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (e.target.value == "") {
                                            setError("Name is required");
                                            setIsValid(false);
                                        }
                                        setIsValid(true);
                                        setError("");
                                    }}
                                    className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${error ? "border-red-500" : ""
                                        }`}
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    value={adminEmail}
                                    onChange={(e) => {
                                        setAdminEmail(e.target.value);
                                        if (e.target.value == "") {
                                            setError("Email is required");
                                            setIsValid(false);
                                        }
                                        setIsValid(true);
                                        setError("");
                                    }}
                                    className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${error ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter Email Address"
                                    required
                                />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value); if (e.target.value == "") {
                                            setError("PhoneNumber is required");
                                            setIsValid(false);
                                        }
                                        setIsValid(true);
                                        setError("");
                                    }}
                                    className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${error ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="adminpassword">Password</label>
                                <input
                                    type="password" value={adminPassword}
                                    onChange={(e) => {
                                        setAdminPassword(e.target.value); if (e.target.value == "") {
                                            setError("Password is required");
                                            setIsValid(false);
                                        }
                                        setIsValid(true);
                                        setError("");
                                    }}
                                    className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${error ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter Password"
                                />
                            </div>
                        </div>
                    }
                    buttons={
                        <Button title={isLoading ? "Loading..." : "Create Admin"} btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5" btnClick={handleSubmit} />
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