import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../../store/adminStore';
import { Button } from '../../../components/shared/Button';
import { useLocation } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';

export const ViewQuestion = () => {
    // const { questions } = useAdminStore();
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory;

    useEffect(() => {
        const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        const questionsForSelectedCategory = allQuestions.filter(
            (question) => question.category === selectedCategory
        );
        // if (questionsForSelectedCategory.length === 0) {
        //     setDisplayedQuestions(questionsForSelectedCategory);
        // } else {
            setDisplayedQuestions(questionsForSelectedCategory);
        // }
    }, [selectedCategory]);

    return (
        <div className='px-8'>
            <Header title="View Questions" />
            {displayedQuestions.map((question, index) => (
                <div key={question.id} className='px-4 my-6 flex flex-col gap-6'>
                    <div className='text-xl font-semibold'>{question.id}</div>
                    {question.questions.map((q, i) => (
                        <div key={q.id} className='flex flex-col gap-2'>
                            <div className="flex gap-2">
                                <div className='font-semibold'>Question {i + 1}:</div>
                                <div>{q.text}</div>
                            </div>
                            <div>
                                {q.options.map((option, i) => (
                                    <div key={i} className='mb-2'>
                                        {/* <input type={q.type} /> */}
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className='flex justify-end py-4'>
                <Button title="Close" btnStyles="px-4 py-3 text-white bg-primary rounded-md" btnClick={() => window.history.back()} />
            </div>
        </div>
    );
};