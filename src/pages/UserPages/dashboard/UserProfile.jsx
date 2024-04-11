import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import axios from 'axios';
import add from '../../../assets/add.png';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';
import { User } from '../../AdminPages/dashboard/User';

export const UserProfile = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [rank, setRank] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [error, setError] = useState("")

    const userImage = localStorage.getItem('userAvatar');

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const token = localStorage.getItem("auth-token");

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.monnify.com/plugin/monnify.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        getUserDetails();
        setUserAvatar(userImage);
        // setFullName(fullName);
        // setEmail(email);
        // setRank(rank);
        // setPhoneNumber(phoneNumber);
        // setUserId(userId);
    }, []);

    const getUserDetails = async () => {
        setIsLoading(true);
        axios.get("https://ncs-cbt-api.onrender.com/users/dashboard", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => {
                console.log(res)
                const user = res.data.data;
                setFullName(user.fullName)
                setEmail(user.email)
                setUserId(user.examineeId)
                setRank(user.rank)
                setPhoneNumber(user.phoneNumber)
            })
            .catch((err) => {
                console.log(err)
            })
        setIsLoading(false)
    }

    const editDetails = async () => {
        setIsEditing(true);
        console.log(isEditing, "Editing")
        // setIsLoading(true);
        // try {
        //     const response = await axios.get(url, {
        //         headers:
        //         {
        //             "Authorization": `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         }
        //     });
        //     console.log(response);
        //     console.log("getting details...")
        // } catch (err) {
        //     console.log(err)
        // }
        // // setUser(res.data.data)
        // // console.log(user.fullName, user.email, user.examineeId, user.rank, user.phoneNumber)
        // setFullName(user.fullName)
        // setEmail(user.email)
        // setUserId(user.examineeId)
        // setRank(user.rank)
        // setPhoneNumber(user.phoneNumber)
        // setIsLoading(false)
    }

    const handleSaveClick = async () => {
        console.log(isValid);
        if (isValid) {
            const updatedUserData = { fullName, email, phoneNumber, password };
            console.log(updatedUserData);
            try {
                const response = await axios.post(
                    "https://ncs-cbt-api.onrender.com/users/update-profile",
                    updatedUserData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                    }
                );
                console.log(response);
                if (response.status === 201) {
                    getUserDetails();
                    setIsEditing(false);
                    alert("Profile updated successfully");
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        else {
            setIsEditing(false);
        }
    };

    const handlePasswordChange = () => {
        if (password === confirmPassword) {
            // Perform password change operation
            console.log('Password changed successfully');
            alert("Password changed successfully");
        } else {
            setError("Passwords do not match")
        }
    };

    // const payWithMonnify = () => {
    //     if (window.MonnifySDK) {
    //         MonnifySDK.initialize({
    //             amount: 100,
    //             currency: "NGN",
    //             reference: new String((new Date()).getTime()),
    //             customerFullName: 'Blessed-Agboola',
    //             customerEmail: 'timimah0117@gmail.com',
    //             apiKey: "MK_TEST_2GBH9XRSH0",
    //             contractCode: "5254936728",
    //             paymentDescription: "NCS-CBT Subscription Payment",
    //             metadata: {
    //                 "name": 'Blessed-Agboola',
    //                 "age": 45
    //             },
    //             incomeSplitConfig: [{
    //                 "subAccountCode": "MFY_SUB_342113621921",
    //                 "feePercentage": 50,
    //                 "splitAmount": 1900,
    //                 "feeBearer": true
    //             }, {
    //                 "subAccountCode": "MFY_SUB_342113621922",
    //                 "feePercentage": 50,
    //                 "splitAmount": 2100,
    //                 "feeBearer": true
    //             }],
    //             onLoadStart: () => {
    //                 console.log("loading has started");
    //             },
    //             onLoadComplete: () => {
    //                 console.log("SDK is UP");
    //             },
    //             onComplete: function(response) {
    //                 //Implement what happens when the transaction is completed.
    //                 console.log(response);
    //             },
    //             onClose: function(data) {
    //                 //Implement what should happen when the modal is closed here
    //                 console.log(data);
    //             }
    //         });
    //     } else {
    //         console.log("Monnify SDK not available");
    //     }
    // }
    const subscribe = async () => {
        console.log(userId, "User ID")
        const examineeId = userId;
        const plan = "paid";
        const subscriptionData = { plan, examineeId };
        try {
            const response = await axios.post(
                "https://ncs-cbt-api.onrender.com/users/subscribe",
                subscriptionData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(response);
            if (response.status === 201) {
                alert("Subscription successful");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const subscriptionExpiryDate = new Date('2023-06-30');
    const daysUntilExpiry = Math.ceil((subscriptionExpiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isSubscriptionExpiringSoon = daysUntilExpiry <= 30;

    return (
        <div className="flex flex-col w-full p-10">
            <Header title="User Profile" />
            {isLoading && <div className="text-center text-red-600">Getting user details...</div>}
            <main className="flex-grow">
                <div className="flex items-center justify-between my-10">
                    <div className='flex flex-col'>
                        <div className='rounded-md h-44 w-52 relative'>
                            {userAvatar !== '' ? <img src={userAvatar} alt="user avatar" className='absolute h-44 w-52 rounded-md object-cover mt-1 border border-primary' /> :
                                <img src="https://via.placeholder.com/150" alt="Profile" className="absolute h-44 w-52 rounded-md object-cover mt-2 border border-primary" />
                            }
                        </div>
                        <div className='flex relative cursor-pointer justify-end w-56'>
                            <input type="file" accept='.png, .jpg, .jpeg, .svg' onChange={
                                (e) => {
                                    setUserAvatar(URL.createObjectURL(e.target.files[0]));
                                    localStorage.setItem('userAvatar', URL.createObjectURL(e.target.files[0]))
                                }
                            }
                                className='opacity-0 z-10 cursor-pointer'
                            />
                            <img src={add} alt="add avatar" className='opacity-60 absolute -mt-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p>Last subscription: {subscriptionExpiryDate.toLocaleDateString()}</p>
                        <button
                            className={`px-4 py-2 rounded-md ${isSubscriptionExpiringSoon ? 'bg-primary text-white' : 'bg-grey text-white cursor-not-allowed'}`}
                            disabled={!isSubscriptionExpiringSoon}
                            onClick={subscribe}
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
                            {!isEditing && <div>{fullName}</div>}
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
                            {!isEditing && <div>{email}</div>}
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
                                    disabled
                                />
                            )}
                            {!isEditing && <div>{userId}</div>}
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
                                    disabled
                                />
                            )}
                            {!isEditing && <div>{rank}</div>}
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
                            {!isEditing && <div>{phoneNumber}</div>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {isEditing ? (
                            <div className='flex py-3 my-2'></div>
                            // <Button title="Done" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={handleSaveClick} />
                        ) : (
                            <Button title="Edit" btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4" btnClick={() => { setIsEditing(true); editDetails(); }} />
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
