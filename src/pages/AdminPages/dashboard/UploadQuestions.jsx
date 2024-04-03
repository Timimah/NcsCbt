import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import edit from '../../../assets/edit.png';
import add from '../../../assets/add.png';
import { Modal } from '../../../components/shared/Modal';

export const UploadQuestions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([
        { id: 1, text: '', options: ['', '', '', ''], type: 'single', correctOptions: [] },
    ]);
    const [questionCategory, setQuestionCategory] = useState('');
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuestions, setEditedQuestions] = useState([]);
    const [editQuestions, setEditQuestions] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory;
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);

    useEffect(() => {
        setDisplayedQuestions(JSON.parse(localStorage.getItem('questions')) || []);
        const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        const questionsForSelectedCategory = allQuestions.filter(
            (question) => question.category === selectedCategory
        );
        setEditQuestions(questionsForSelectedCategory);

        // setDisplayedQuestions(JSON.parse(localStorage.getItem('questions')) || []);
    }, [questions, selectedCategory]);

    const categories = [
        'CAI-CAII', 'CAII-AIC', 'AIC-IC', 'IC-ASCII', 'ASCII-ASCI', 'ASCI-DSC',
        'DSC-SC', 'SC-CSC', 'CSC-AC', 'AC-DC', 'DC-CC'
    ];

    const handleQuestionTextChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        setIsEditing(true);
        setEditedOptions((prevEditedOptions) => ({
            ...prevEditedOptions,
            [`${questionIndex}-${optionIndex}`]: e.target.value,
        }));
    };

    const handleQuestionTypeChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].type = event.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectOptionsChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        const isChecked = event.target.checked;
        optionIndex = parseInt(event.target.value, 10);

        if (isChecked) {
            newQuestions[questionIndex].correctOptions.push(optionIndex);
        } else {
            newQuestions[questionIndex].correctOptions = newQuestions[questionIndex].correctOptions.filter(
                (index) => index !== optionIndex
            );
        }

        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        const newQuestions = [...questions];
        newQuestions.push({
            id: newQuestions.length + 1,
            text: '',
            options: ['', '', '', ''],
            type: 'single',
            correctOptions: [],
        });
        setQuestions(newQuestions);
    };

    const handleSaveQuestions = () => {
        // Here, you can handle the logic to save the questions data to a database or API
        const uniqueId = `${questionCategory}-${Math.random().toString(12).substr(2, 4)}`;
        console.log('Question Category:', questionCategory);

        const question = JSON.parse(localStorage.getItem('questions')) || [];
        const questionData = {
            id: uniqueId,
            category: questionCategory,
            questions: questions
        };
        question.push(questionData);
        localStorage.setItem('questions', JSON.stringify(question));
        addQuestion(question);
        setQuestionCategory('');
        setQuestions([{ id: 1, text: '', options: ['', '', '', ''], type: 'single', correctOptions: [] }])
        setIsPreviewVisible(true);
        // navigate('../preview-question')
    };

    const handleEditOptionChange = (questionIndex, optionIndex, event) => {
        const updatedQuestions = [...editedQuestions];
        const updatedOptions = [...updatedQuestions[questionIndex].options];
        updatedOptions[optionIndex] = event.target.value;
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            options: updatedOptions,
        };
        setEditedQuestions(updatedQuestions);
    };

    const handleSaveEditedQuestions = () => {
        const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        const updatedQuestions = allQuestions.map((item) => {
            if (item.category === selectedCategoryData.category) {
                return {
                    ...item,
                    questions: editedQuestions,
                };
            }
            return item;
        });

        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setDisplayedQuestions(updatedQuestions);
        setIsEditing(false);
        setSelectedCategoryData(null);
        setEditedQuestions([]);
    };


    const handleEdit = (category) => {
        setIsEditing(true);
    
        // Find the questions for the selected category
        const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        const questionsForSelectedCategory = allQuestions.find(
            (item) => item.category === category
        );
    
        if (questionsForSelectedCategory) {
            setSelectedCategoryData({
                category: category,
                questions: questionsForSelectedCategory.questions,
            });
        } else {
            console.error('No questions found for the selected category.');
        }
    
        // Update the form data with the stored data
        const storedQuestions = questionsForSelectedCategory?.questions || [];
        setEditedQuestions(storedQuestions);
    };
    

    return (
        <div className='flex flex-col w-full p-10'>
            <Header title="Upload Questions" />
            {!isPreviewVisible &&
                <>
                    <div className='my-4 cursor-pointer text-primary' onClick={() => window.history.back()}>
                        Back
                    </div>
                    <div className='flex flex-col gap-8 px-4'>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="questionCategory" className="text-lg">Question Category</label>
                            <select
                                id="questionCategory"
                                value={questionCategory}
                                onChange={(event) => setQuestionCategory(event.target.value)}
                                className={`border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-1/2 bg-gray-200 border-primary`}
                            >
                                <option value="" className='px-4 py-3 text-primary text-lg'>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category} className='px-4 py-3 text-primary text-lg'>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {questions.map((question, index) => (
                            <div key={question.id} className='flex flex-col gap-8'>
                                <div className='flex flex-col gap-4'>
                                    <div className='text-xl font-semibold'>Question {question.id}</div>
                                    <label htmlFor={`questionText-${question.id}`} className="text-lg">Question Text:</label>
                                    <textarea
                                        id={`questionText-${question.id}`}
                                        value={question.text}
                                        onChange={(event) => handleQuestionTextChange(index, event)}
                                        rows={3}
                                        className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                                    />
                                </div>
                                <div className='flex flex-col gap-6 w-full'>
                                    <label className="text-lg">Options:</label>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className='flex flex-col w-full'>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(event) => handleOptionChange(index, optionIndex, event)}
                                                className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                                            />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={question.correctOptions.includes(optionIndex)}
                                                    onChange={(event) => handleCorrectOptionsChange(index, optionIndex, event)}
                                                />
                                                Correct Option
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className="text-lg">Question Type:</label>
                                    <div className='flex gap-4'>
                                        <label >
                                            <input
                                                type="radio"
                                                value="single"
                                                checked={question.type === 'single'}
                                                onChange={(event) => handleQuestionTypeChange(index, event)}
                                                className='mx-3'
                                            />
                                            Single Choice
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="multiple"
                                                checked={question.type === 'multiple'}
                                                onChange={(event) => handleQuestionTypeChange(index, event)}
                                                className='mx-3'
                                            />
                                            Multiple Choice
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full justify-between gap-4 my-10">
                        <div className='text-xl flex gap-4 items-center w-1/3 cursor-pointer' onClick={handleAddQuestion}>
                            <img src={add} alt="" />
                            <div>
                                Add More
                            </div>
                        </div>
                        <Button title="Save Questions" btnStyles="px-4 py-3 text-white bg-primary rounded-md w-1/3" btnClick={handleSaveQuestions} />
                        <Button title="View Saved Questions" btnStyles="px-4 py-3 text-white bg-primary rounded-md w-1/3" btnClick={() => setIsPreviewVisible(true)} />
                    </div>
                </>
            }
            {isPreviewVisible && (
                <div className='my-10'>
                    <div className='text-2xl font-bold'>Preview Questions</div>
                    {displayedQuestions.map((question, index) => (
                        <>
                            <div key={question.id} className='my-10'>
                                <div className='text-lg font-semibold my-2'>Question Category: {question.id}</div>
                                {question.questions.map((q, i) => (
                                    <div key={q.id} className='flex flex-col gap-4 mb-10'>
                                        <div className="flex gap-4 font-bold text-lg">
                                            <div className=''>Question {i + 1}:</div>
                                            <div>{q.text}</div>
                                        </div>
                                        <div className='grid grid-cols-2 space-y-4'>
                                            {q.options.map((option, i) => (
                                                <div key={i} className='flex gap-4 items-center'>
                                                    <div>{option}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                title="Edit"
                                btnStyles="px-4 py-3 text-white bg-primary rounded-md my-4 w-full"
                                btnClick={() => handleEdit(question.category)}
                            />
                        </>
                    ))}
                    <Button title="Done" btnStyles="px-4 py-3 text-white bg-primary rounded-md my-4 w-full" btnClick={() => setIsPreviewVisible(false)} />
                </div>
            )}
            {isEditing && selectedCategoryData && (
                <Modal
                    title={`Edit Questions - ${selectedCategoryData.category}`}
                    closeModal={() => {
                        setIsEditing(false);
                        setSelectedCategoryData(null);
                    }}
                    modStyles="w-2/3 bg-secondary h-2/3 overflow-y-scroll"
                    content={
                        <div className='flex flex-col gap-8 my-6'>
                            <p>Category: {selectedCategoryData.category}</p>
                            {selectedCategoryData.questions.map((question, index) => (
                                <div key={index} className='flex flex-col gap-4'>
                                    <div className='text-xl font-semibold'>
                                        Question {index + 1}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='font-semibold'>
                                            Question Text:
                                        </div>
                                        <div>{question.text}</div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='font-semibold'>Options:</div>
                                        {question.options.map((option, i) => (
                                            <div key={i} className='flex gap-2'>
                                                <input
                                                    type={question.type}
                                                    value={editedQuestions[index]?.options[i] || ''} 
                                                    placeholder={option}
                                                    onChange={(e) => handleEditOptionChange(index, i, e)}
                                                />
                                                {/* {option} */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    buttons={
                        <Button
                            title="Save"
                            btnStyles="px-4 py-3 text-white bg-primary rounded-md"
                            btnClick={handleSaveEditedQuestions}
                        />
                    }
                />
            )}
        </div>
    );
};