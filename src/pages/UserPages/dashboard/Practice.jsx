import React, { useEffect, useState } from 'react'
import { Modal } from '../../../components/shared/Modal';
import { Button } from '../../../components/shared/Button';
import { Header } from '../../../components/shared/Header';
import axios from 'axios' 

export const Practice = () => {
    const [showModal, setShowModal] = useState(false);
    const [rank, setRank] = useState("");
    const [time, setTime] = useState("5 min");
    const [error, setError] = useState("");
    const token = localStorage.getItem("auth-token")

    useEffect(() => {
        console.log('Practice Page')
        setShowModal(true);
    }, []);

    const getPracticeQuestions = async () => {
        axios.get(
                "https://ncs-cbt-api.onrender.com/exam/getExamQuestions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                // setQuestions(res.data.data || []);
                // setDisplayedQuestions(questions);
                // const questionsForSelectedCategory =
                //     questions.filter(
                //         (question) =>
                //             question.category === selectedCategory
                //     );
                // console.log(
                //     questions,
                //     questionsForSelectedCategory
                // );
                // setEditQuestions(
                //     questionsForSelectedCategory
                // );
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='flex items-center justify-center px-8'>
            <Header title="Practice" />
            {showModal && (
                <Modal
                    title="Quiz Settings"
                    closeModal={() => setShowModal(false)}
                    modStyles="bg-secondary w-1/2 h-fit"
                    content={
                        <div className='my-10'>
                            <div>
                                <label htmlFor="time">Set Time</label>
                                <input
                                    type="text"
                                    id="time"
                                    value={time}
                                    className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
                                    placeholder="5 min"
                                />
                            </div>
                            <div>
                                <label htmlFor="rank" className="block py-1 -mb-1">Select Rank</label>
                                <select id="rank" name="rank" value={rank} onChange={(e) => { setRank(e.target.value); setError("") }} className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${error ? 'border-red-500' : ''}`}>
                                    <option value="">Select a category</option>
                                    <option value="CAI">CAI</option>
                                    <option value="CAII">CAII</option>
                                    <option value="AIC">AIC</option>
                                    <option value="IC">IC</option>
                                    <option value="ASCII">ASCII</option>
                                    <option value="ASCI">ASCI</option>
                                    <option value="DSC">DSC</option>
                                    <option value="SC">SC</option>
                                    <option value="CSC">CSC</option>
                                    <option value="AC">AC</option>
                                    <option value="DC">DC</option>
                                    <option value="CC">CC</option>
                                </select>
                                {error && <div className="text-sm text-red-500">{error}</div>}
                            </div>
                        </div>
                    }
                    buttons={
                        <Button
                            title="Start Quiz"
                            btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full"
                            btnClick={getPracticeQuestions}
                        />
                    }
                />
            )}
        </div>
    )
}
