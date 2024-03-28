import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';

export const UserProfile = () => {
    const url = "https://ncs-cbt-api.onrender.com/users/dashboard"

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("auth-token");
        axios.get(url, {
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
                    setUser(res.data.data)
                    // console.log(user.fullName, user.email, user.examineeId, user.rank, user.phoneNumber)
                    setFullName(user.fullName)
                    setEmail(user.email)
                    setUserId(user.examineeId)
                    setRank(user.rank)
                    setPhoneNumber(user.phoneNumber)
                    setIsLoading(false)
                }
            }).catch((err) => {
                console.log(err.message);
            });
    }, []);
    const navigate = useNavigate();
    const  {loggedInUser, loggedInUserId, loggedInUserEmail, loggedInUserPhoneNumber, loggedInUserRank} = useUserStore();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [rank, setRank] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState("")

    const [user, setUser] = useState({})

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleSaveClick = async () => {
        console.log(isValid);
        if (isValid) {
            const updatedUserData = { fullName, email, userId, rank, phoneNumber };
            console.log(updatedUserData);
            try {
                const response = await axios.post(
                    "https://ncs-cbt-api.onrender.com/users/update-profile",
                    updatedUserData,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log(response.data);
                setIsSaving(false);
            } catch (err) {
                console.log(err.message);
                setIsSaving(false);
            }
            setIsSaving(true);
        }
        else {
            setIsEditing(false);
        }
    };

    const handlePasswordChange = () => {
        if (newPassword === confirmPassword) {
            // Perform password change operation
            console.log('Password changed successfully');
        } else {
            setError("Passwords do not match")
        }
    };

    const subscriptionExpiryDate = new Date('2023-06-30');
    const daysUntilExpiry = Math.ceil((subscriptionExpiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isSubscriptionExpiringSoon = daysUntilExpiry <= 30;

    return (
        <div className="flex flex-col w-full p-10">
            <Header title="User Profile" />
            {isLoading && <div className="text-center text-red-600">Getting user details...</div>}
            <main className="flex-grow">
                <div className="flex items-center justify-between mb-6">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-lg mr-4" />
                    <div className='flex flex-col gap-4'>
                        <p>Last subscription: {subscriptionExpiryDate.toLocaleDateString()}</p>
                        <button
                            className={`px-4 py-2 rounded-md ${isSubscriptionExpiringSoon ? 'bg-primary text-white' : 'bg-grey text-white cursor-not-allowed'}`}
                            disabled={!isSubscriptionExpiringSoon}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <div className="flex flex-col gap-4">
                        <div className='flex justify-between'>
                            <label htmlFor="fullName" className="w-1/3 block font-bold mb-2">
                                Full Name
                            </label>
                            {isEditing && (
                                <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    setIsValid(true);
                                }}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                            )}
                            {!isEditing && <div>{loggedInUser}</div>}
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="email" className="blow-1/3 ck font-bold mb-2">
                                Email
                            </label>
                            {isEditing && (
                                <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsValid(true);
                                }}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                            )}
                            {!isEditing && <div>{loggedInUserEmail}</div>}
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="id" className="block w-1/3 font-bold mb-2">
                                ID
                            </label>
                            {isEditing && (
                                <input
                                type="text"
                                id="id"
                                value={userId}
                                onChange={(e) => {
                                    setUserId(e.target.value);
                                    setIsValid(true);
                                }}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                            )}
                            {!isEditing && <div>{loggedInUserId}</div>}
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="rank" className="blocw-1/3 k font-bold mb-2">
                                Rank
                            </label>
                            {isEditing && (
                                <input
                                type="text"
                                id="rank"
                                value={rank}
                                onChange={(e) => {
                                    setRank(e.target.value);
                                    setIsValid(true);
                                }}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                            )}
                            {!isEditing && <div>{loggedInUserRank}</div>}
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="phoneNumber" className="w-1/3 block font-bold mb-2">
                                Phone Number
                            </label>
                            {isEditing && (
                                <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    setIsValid(true);
                                }}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                            )}
                            {!isEditing && <div>{loggedInUserPhoneNumber}</div>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {isEditing ? (
                            <div className='flex py-3 my-2'></div>
                            // <Button title="Done" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleSaveClick} />
                        ) : (
                            <Button title="Edit" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={() => setIsEditing(true)} />
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Security</h2>
                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between">
                            <label htmlFor="newPassword" className="w-1/3 block font-bold mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-1/2 px-4 py-2 rounded border mb-4"
                            />
                        </div>
                        <div className="flex justify-between">
                            <label htmlFor="confirmPassword" className="w-1/2 block font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-1/2 px-4 py-2 rounded border mb-4"
                            />
                        </div>
                        {error && <div className="text-sm text-red-500">{error}</div>}
                        <div className="flex justify-end">
                            <Button title="Change Password" btnStyles="bg-primary text-white py-2 px-4 rounded-md" btnClick={handlePasswordChange} />
                        </div>
                        {isEditing && (
                            isSaving ? (
                                <button className='border border-primary py-3 px-4 rounded-md my-4' disabled>Saving...</button>
                            ) :
                                (<Button title="Save Changes" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleSaveClick} />)
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
