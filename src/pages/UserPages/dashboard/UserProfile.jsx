import React, { useState } from 'react';
import { Header } from '../../../components/user/Header';
import { Button } from '../../../components/shared/Button';

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        id: '12345',
        rank: 'Corporal',
        phoneNumber: '1234567890',
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Perform save operation
        setIsEditing(false);
    };

    const handlePasswordChange = () => {
        if (newPassword === confirmPassword) {
            // Perform password change operation
            console.log('Password changed successfully');
        } else {
            console.log('Passwords do not match');
        }
    };

    const subscriptionExpiryDate = new Date('2023-06-30');
    const daysUntilExpiry = Math.ceil((subscriptionExpiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isSubscriptionExpiringSoon = daysUntilExpiry <= 30;

    return (
        <div className="flex flex-col w-full p-10">
            <Header title="Dashboard" username="Bedlam" />
            <main className="flex-grow">
                <div className="flex items-center justify-between mb-6">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-lg mr-4" />
                    <div className='flex flex-col gap-4'>
                        <p>Last subscription: {subscriptionExpiryDate.toLocaleDateString()}</p>
                        <button
                            className={`px-4 py-2 rounded-md ${isSubscriptionExpiringSoon ? 'bg-primary text-white' : 'bg-grey text-white cursor-not-allowed'
                                }`}
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
                            <input
                                type="text"
                                id="fullName"
                                value={personalInfo.fullName}
                                disabled={!isEditing}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="email" className="blow-1/3 ck font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={personalInfo.email}
                                disabled={!isEditing}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="id" className="block w-1/3 font-bold mb-2">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                value={personalInfo.id}
                                disabled={!isEditing}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, id: e.target.value })}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="rank" className="blocw-1/3 k font-bold mb-2">
                                Rank
                            </label>
                            <input
                                type="text"
                                id="rank"
                                value={personalInfo.rank}
                                disabled={!isEditing}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, rank: e.target.value })}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="phoneNumber" className="w-1/3 block font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={personalInfo.phoneNumber}
                                disabled={!isEditing}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                                className="w-1/2 px-4 py-2 rounded border"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {isEditing ? (
                            <Button title="Save Updates" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleSaveClick} />
                        ) : (
                            <Button title="Edit" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleEditClick} />
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
                        <div className="flex justify-end">
                            <Button title="Change Password" btnStyles="bg-primary text-white py-2 px-4 rounded-md" btnClick={handlePasswordChange} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
