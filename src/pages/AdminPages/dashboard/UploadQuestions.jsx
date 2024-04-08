import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import edit from '../../../assets/edit.png';
import add from '../../../assets/add.png';
import { Modal } from '../../../components/shared/Modal';
import axios from 'axios';
import { useUserStore } from '../../../store/userStore';
// import pdfToText from 'react-pdftotext'
// import {parse} from 'pdf-parse'

export const UploadQuestions = () => {
    const navigate = useNavigate();
    const { questions, setQuestions } = useUserStore();
    const [questionDetails, setQuestionDetails] = useState([]);
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState(['']);
    const [answer, setAnswer] = useState('');
    const [type, setType] = useState('');
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const token = localStorage.getItem('auth-token');

    const [uploadError, setUploadError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [editQuestions, setEditQuestions] = useState(false);
    const [editedQuestions, setEditedQuestions] = useState([]);
    const [upload, setUpload] = useState(false);

    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory;
    console.log(selectedCategory, location)
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);

    useEffect(() => {
        axios.get("https://ncs-cbt-api.onrender.com/exam/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then((res) => {
                console.log(res)
                setQuestions(res.data.data || [])
                setDisplayedQuestions(questions)
                const questionsForSelectedCategory = questions.filter(
                    (question) => question.category === selectedCategory
                );
                console.log(questions, questionsForSelectedCategory)
                setEditQuestions(questionsForSelectedCategory);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [selectedCategory]);

    const categories = [
        'CAI-CAII', 'CAII-AIC', 'AIC-IC', 'IC-ASCII', 'ASCII-ASCI', 'ASCI-DSC',
        'DSC-SC', 'SC-CSC', 'CSC-AC', 'AC-DC', 'DC-CC'
    ];

    const handleOptionChange = (index, value) => {
        const newOptionsArray = [...options];
        newOptionsArray[index] = value;
        setOptions(newOptionsArray);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptionsArray = [...options];
        newOptionsArray.splice(index, 1);
        setOptions(newOptionsArray);
    };

    const handleAddQuestion = () => {
        console.log(questionDetails)
        const newQuestionObj = {
            question: question,
            answer: answer,
            options: options,
            type: type,
            category: category
        };
        // console.log(newOptions)
        setQuestionDetails([...questionDetails, newQuestionObj]);
        setQuestion('');
        setAnswer('');
        setOptions(['']);
        // setCategory('');
        setType('');
    }

    const updateQuestions = async () => {
        axios.get("https://ncs-cbt-api.onrender.com/exam/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            setQuestions(res.data.data || [])
            setDisplayedQuestions(questions)
            const questionsForSelectedCategory = questions.filter(
                (question) => question.category === selectedCategory
            );
            console.log(questions, questionsForSelectedCategory)
            setEditQuestions(questionsForSelectedCategory);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSaveQuestions = async () => {
        // Here, you can handle the logic to save the questions data to a database or API
        // const uniqueId = `${questionCategory}-${Math.random().toString(12).substr(2, 4)}`;
        if (questionCategory === '' || questionDetails.some((question) => question.text === '')) {
            alert('Please fill in all the required fields');
            return;
        } else {
            const questionData = {
                questionDetails
            };
            console.log(questionData);
            try {
                const response = await axios.post(
                    "https://ncs-cbt-api.onrender.com/exam/uploadMultiple",
                    questionData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response);
                updateQuestions();
            } catch (err) {
                if (!err?.response) {
                    console.log(err);
                    console.log(err.message);
                } else if (err.response?.status === 409) {
                    setUploadError(err.response.data.message);
                } else {
                    setUploadError("Uplaod Failed");
                }
            }
            // setQuestionCategory(''); 
            // setQuestions([{ id: 1, text: '', options: ['', '', '', ''], type: 'single', answer: '' }])   
        }

        // setIsPreviewVisible(true);
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
        console.log(category);
        setIsEditing(true);
        const questionsForSelectedCategory = editQuestions.find(
            (item) => item.category === category
        );

        if (questionsForSelectedCategory) {
            console.log(questionsForSelectedCategory);
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

    const uploadFile = () => {
        setUpload(true);
    }

    // const [pdfText, setPdfText] = useState('');
    // const [questionss, setQuestionss] = useState([]);
    // const [text, setText] = useState("")

    // const extractText = async (e) => {
    //     const file = await e.target.files[0];
    //     pdfToText(file).then(
    //         text => {
    //             console.log(text)
    //             setText(text);
    //             const extractedQuestions = extractQuestions(text);
    //             setQuestionss(extractedQuestions);
    //             console.log(questionss)
    //         })
    //         .catch(error => console.error("Failed to extract text from pdf"));
    // };

    // const extractQuestions = (text) => {
    //     const lines = text.split('\n');
    //     console.log(lines)
    //     const questions = [];

    //     let currentQuestion = null;
    //     let currentOptions = [];

    //     for (let i = 0; i < lines.length; i++) {
    //         const line = lines[i].trim();
    //         console.log(line)

    //         if (line.endsWith('?')) {
    //             // New question
    //             if (currentQuestion !== null) {
    //                 questions.push({ question: currentQuestion, options: currentOptions });
    //                 currentOptions = [];
    //                 console.log(questions)
    //             }
    //             currentQuestion = line;
    //             console.log(currentQuestion)
    //         } else if (/^[a-d]\)\s/.test(line)) {
    //             // Option
    //             currentOptions.push(line.replace(/^\w\)\s*/, ''));
    //         } else if (line.length === 0) {
    //             // Skip empty lines
    //             continue;
    //         } else {
    //             // Append to current question
    //             currentQuestion += ' ' + line;
    //         }
    //     }

    // Add the last question and options
    //     if (currentQuestion !== null) {
    //         questions.push({ question: currentQuestion, options: currentOptions });
    //     }
    // };

    return (
        <div className='flex flex-col w-full p-10'>
            <Header title="Upload Questions" />
            {uploadError && <div className='text-red-500'>{uploadError}</div>}
            {upload && (
                <Modal
                    title="Upload Question"
                    content={
                        <div className='flex flex-col gap-6 my-10'>
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
                            <div className='border border-primary w-full p-10 rounded-md'>
                                <input type="file" accept="application/pdf" onChange={extractText} />
                                <div className="w-full">{pdfText}</div>
                            </div>
                        </div>
                    }
                    buttons={
                        <Button title="Upload" btnStyles="px-4 py-3 text-white bg-primary rounded-md" btnClick={uploadFile} />
                    }
                    modStyles="w-2/3 bg-secondary h-2/3"
                    closeModal={() => setUpload(false)}
                />
            )}
            {!isPreviewVisible &&
                <>
                    <div className='flex justify-between'>
                        <div className='my-4 cursor-pointer text-primary' onClick={() => window.history.back()}>
                            Back
                        </div>
                        <Button title="Select File to Upload" btnStyles="px-4 py-3 text-white bg-primary rounded-md w-1/3" btnClick={uploadFile} />
                    </div>
                    {
                        questionDetails.length >= 0 ? (
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-2">Questions</h2>
                                {questionDetails.map((question, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-lg font-bold">Question {index + 1}: {question.question}</h3>
                                        <p>Answer: <span className='font-semibold'>{question.answer}</span></p>
                                        <p>Options:</p>
                                        <div className='grid grid-cols-4'>
                                            {question.options.map((option, i) => (
                                                <div className="ml-2">{option}</div>
                                            ))}
                                        </div>
                                        <hr className='mt-6' />
                                    </div>
                                ))}
                            </div>
                        ) : (<div>No questions added yet</div>)
                    }
                    <div className='flex flex-col gap-8 px-4'>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="questionCategory" className="text-lg">Question Category</label>
                            <select
                                id="questionCategory"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
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
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col gap-4'>
                                <div className='text-xl font-semibold'>Question</div>
                                <label htmlFor="question" className="text-lg">Question:</label>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    rows={3}
                                    className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-6 w-full'>
                                <label className="text-lg" htmlFor='answer'>Answer:</label>
                                <div className='flex flex-col w-full'>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 w-full'>
                                <label className="text-lg">Options:</label>
                                {options.map((option, index) => (
                                    <div key={index} className="mb-2 flex">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="border border-primary rounded-md bg-gray-200 py-2 px-4 flex-grow mr-2"
                                        />
                                        <Button title="Remove" btnStyles="px-4 py-3 bg-yellow rounded-md" btnClick={() => handleRemoveOption(index)} />
                                    </div>
                                ))}
                                <Button title={
                                    <div className='flex gap-2 text-white'>
                                        <img src={add} alt="" />
                                        <div>
                                            Add Option
                                        </div>
                                    </div>
                                } btnStyles="px-4 py-3 bg-cardgreen rounded-md" btnClick={handleAddOption} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <label className="text-lg">Question Type:</label>
                                <div className='flex gap-4'>
                                    <label >
                                        <input
                                            type="radio"
                                            value="exam"
                                            checked={type === 'exam'}
                                            onChange={(e) => setType(e.target.value)}
                                            className='mx-3'
                                        />
                                        Exam
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="practice"
                                            checked={type === 'practice'}
                                            onChange={(e) => setType(e.target.value)}
                                            className='mx-3'
                                        />
                                        Practice
                                    </label>
                                </div>
                            </div>
                        </div>
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
                                <div className='text-lg font-semibold my-2'>Question Category: {question.category}</div>
                                <div className='flex flex-col gap-4 mb-10'>
                                    <div className="flex gap-4 font-bold text-lg">
                                        <div className=''>Question {index + 1}:</div>
                                        <div>{question.question}</div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        Options:
                                        {question.options === "" ?
                                            (<div>No options added yet</div>) :
                                            (
                                                <div className=''>{question.options}</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <Button
                                title="Edit"
                                btnStyles="px-4 py-3 text-white bg-primary rounded-md my-4 w-full"
                                btnClick={() => {
                                    // handleEdit(question.category);
                                    console.log(question.category)}}
                            />
                        </>
                    ))}
                    <Button title="Done" btnStyles="px-4 py-3 text-white bg-primary rounded-md my-4 w-full" btnClick={() => setIsPreviewVisible(false)} />
                </div>
            )}
            {isEditing && selectedCategoryData && (
                // <Modal
                //     title={`Edit Questions - ${selectedCategoryData.category}`}
                //     closeModal={() => {
                //         setIsEditing(false);
                //         setSelectedCategoryData(null);
                //     }}
                //     modStyles="w-2/3 bg-secondary h-2/3 overflow-y-scroll"
                //     content={
                //         <div className='flex flex-col gap-8 my-6'>
                //             <p>Category: {selectedCategoryData.category}</p>
                //             {selectedCategoryData.questions.map((question, index) => (
                //                 <div key={index} className='flex flex-col gap-4'>
                //                     <div className='text-xl font-semibold'>
                //                         Question {index + 1}
                //                     </div>
                //                     <div className='flex flex-col gap-2'>
                //                         <div className='font-semibold'>
                //                             Question Text:
                //                         </div>
                //                         <div>{question.text}</div>
                //                     </div>
                //                     <div className='flex flex-col gap-2'>
                //                         <div className='font-semibold'>Options:</div>
                //                         {question.options.map((option, i) => (
                //                             <div key={i} className='flex gap-2'>
                //                                 <input
                //                                     type={question.type}
                //                                     value={editedQuestions[index]?.options[i] || ''}
                //                                     placeholder={option}
                //                                     onChange={(e) => handleEditOptionChange(index, i, e)}
                //                                 />
                //                                 {/* {option} */}
                //                             </div>
                //                         ))}
                //                     </div>
                //                 </div>
                //             ))}
                //         </div>
                //     }
                //     buttons={
                //         <Button
                //             title="Save"
                //             btnStyles="px-4 py-3 text-white bg-primary rounded-md"
                //             btnClick={handleSaveEditedQuestions}
                //         />
                //     }
                // />
                "")}
        </div>
    );
};