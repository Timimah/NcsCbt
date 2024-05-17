import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { useLocation, useNavigate } from "react-router-dom";
import edit from "../../../assets/edit.png";
import add from "../../../assets/add.png";
import del from "../../../assets/delete.png";
import { Modal } from "../../../components/shared/Modal";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";
// import pdfToText from 'react-pdftotext'
// import {parse} from 'pdf-parse'

export const UploadQuestions = () => {
    const navigate = useNavigate();
    const [allQuestions, setAllQuestions] = useState([]);
    const { questions, setQuestions } =
        useUserStore();
    const [questionCounter, setQuestionCounter] =
        useState(1);
    const [questionDetails, setQuestionDetails] =
        useState([]);
    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");
    const [options, setOptions] = useState([""]);
    const [answer, setAnswer] = useState("");
    const [type, setType] = useState("");
    const [
        displayedQuestions,
        setDisplayedQuestions,
    ] = useState([]);
    const token = localStorage.getItem("auth-token");

    const [uploadError, setUploadError] =
        useState("");
    const [editQuestions, setEditQuestions] =
        useState(false);
    const [upload, setUpload] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [activeTab, setActiveTab] =
        useState("practice");

    const location = useLocation();
    const selectedCategory =
        location.state?.selectedCategory;

    useEffect(() => {
        setAllQuestions(localStorage.getItem("questions") || []);
        axios
            .get(
                "https://ncs-cbt-api.onrender.com/exam/",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setQuestions(res.data.data || []);
                setDisplayedQuestions(questions);
                const questionsForSelectedCategory =
                    questions.filter(
                        (question) =>
                            question.category === selectedCategory
                    );
                setEditQuestions(
                    questionsForSelectedCategory
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const categories = [
        "CAI-CAII",
        "CAII-AIC",
        "AIC-IC",
        "IC-ASCII",
        "ASCII-ASCI",
        "ASCI-DSC",
        "DSC-SC",
        "SC-CSC",
        "CSC-AC",
        "AC-DC",
        "DC-CC",
    ];

    const handleOptionChange = (index, value) => {
        const newOptionsArray = [...options];
        newOptionsArray[index] = value;
        setOptions(newOptionsArray);
    };

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleRemoveOption = (index) => {
        const newOptionsArray = [...options];
        newOptionsArray.splice(index, 1);
        setOptions(newOptionsArray);
    };

    const handleAddQuestion = () => {
        if (
            category === "" ||
            question === "" ||
            answer === "" ||
            options === ""
        ) {
            setUploadError("Input valid values!");
        } else {
            const newQuestionObj = {
                question: question,
                answer: answer,
                options: options,
                type: type,
                category: category,
            };
            setQuestionDetails([
                ...questionDetails,
                newQuestionObj,
            ]);
            setQuestion("");
            setAnswer("");
            setOptions([""]);
        }
    };

const updateQuestions = async () => {
    try {
        const response = await axios.get(
            "https://ncs-cbt-api.onrender.com/exam/",
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        )
        setQuestions(response.data.data || []);
        setDisplayedQuestions(questions);
        const questionsForSelectedCategory =
            questions.filter(
                (question) =>
                    question.category === selectedCategory
            );
        setEditQuestions(questionsForSelectedCategory);

    } catch (err) {
        console.log(err);
    }

    }

    const handleSaveQuestions = async () => {
               if (
            questionCategory === "" ||
            questionDetails.some(
                (question) => question.text === ""
            )
        ) {
            alert(
                "Please fill in all the required fields"
            );
            return;
        } else {
            const questionData = {
                questionDetails,
            };
            localStorage.setItem("questions", JSON.stringify(questionData));
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
                updateQuestions();
                setQuestionDetails([]);
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
        }
    };

    const uploadFile = () => {
        setUpload(true);
    };

    return (
        <div className='flex flex-col w-full p-8 md:p-10'>
            <Header title='Upload Questions' />
            {upload && (
                <Modal
                    title='Upload Question'
                    content={
                        <div className='flex flex-col gap-6 my-10'>
                            <div className='flex flex-col gap-4'>
                                <label
                                    htmlFor='questionCategory'
                                    className='text-lg'>
                                    Question Category
                                </label>
                                <select
                                    id='questionCategory'
                                    value={questionCategory}
                                    onChange={(event) =>
                                        setCategory(event.target.value)
                                    }
                                    className={`border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-1/2 bg-gray-200 border-primary`}>
                                    <option
                                        value=''
                                        className='px-4 py-3 text-primary text-lg'>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                            className='px-4 py-3 text-primary text-lg'>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='border border-primary w-full p-10 rounded-md'>
                                <input
                                    type='file'
                                    accept='application/pdf'
                                    onChange={extractText}
                                />
                                <div className='w-full'>{pdfText}</div>
                            </div>
                        </div>
                    }
                    buttons={
                        <Button
                            title='Upload'
                            btnStyles='px-4 py-3 text-white bg-primary rounded-md'
                            btnClick={uploadFile}
                        />
                    }
                    modStyles='w-2/3 bg-secondary h-2/3'
                    closeModal={() => setUpload(false)}
                />
            )}
            <div className='flex justify-between'>
                <div
                    className='my-4 cursor-pointer text-primary'
                    onClick={() => window.history.back()}>
                    Back
                </div>
                <Button
                    title='Select File to Upload'
                    btnStyles='px-4 py-3 text-white bg-primary rounded-md w-1/3'
                // btnClick={uploadFile}
                />
            </div>
            {uploadError && (
                <div className='text-red-500 font-bold text-xl'>
                    {uploadError}
                </div>
            )}
            <div className='flex flex-col gap-8 px-4'>
                <div className="flex items-center gap-6 w-full">
                    <div className='flex flex-col gap-4 w-full'>
                        <label
                            htmlFor='questionCategory'
                            className='text-lg'>
                            Question Category
                        </label>
                        <select
                            id='questionCategory'
                            value={category}
                            onChange={(event) => {
                                setUploadError("");
                                setCategory(event.target.value);
                            }}
                            className={`border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary bg-gray-200 border-primary`}>
                            <option
                                value=''
                                className='px-4 py-3 text-primary text-lg'>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                    className='px-4 py-3 text-primary text-lg'>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                        <label className='text-lg'>
                            Question Type:
                        </label>
                        <div className='flex gap-4'>
                            <label className="w-full">
                                <input
                                    type='radio'
                                    value='exam'
                                    checked={type === "exam"}
                                    onChange={(e) =>
                                        setType(e.target.value)
                                    }
                                    className='mx-3'
                                />
                                Exam
                            </label>
                            <label className="w-full">
                                <input
                                    type='radio'
                                    value='practice'
                                    checked={type === "practice"}
                                    onChange={(e) =>
                                        setType(e.target.value)
                                    }
                                    className='mx-3'
                                />
                                Practice
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-xl font-semibold'>
                            Question
                        </div>
                        <textarea
                            value={question}
                            onChange={(e) => {
                                setUploadError("");
                                setQuestion(e.target.value.trim());
                            }}
                            rows={3}
                            className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                        />
                    </div>
                    <div className='flex flex-col gap-6 w-full'>
                        <label
                            className='text-lg'
                            htmlFor='answer'>
                            Answer:
                        </label>
                        <div className='flex flex-col w-full'>
                            <input
                                type='text'
                                value={answer}
                                className='border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary'
                                onChange={(e) => setAnswer(e.target.value.trim())}
                            />
                        </div>
                    </div>
                    <label className='text-lg'>
                        Options:
                    </label>
                    <div className='grid grid-cols-2 gap-6 w-full'>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className='mb-2 flex items-center gap-2'>
                                <span>{String.fromCharCode(65 + index)}</span>
                                <input
                                    type='text'
                                    id={`option-${index}`}
                                    value={option}
                                    onChange={(e) => {
                                        setUploadError("");
                                        handleOptionChange(
                                            index,
                                            e.target.value.trim()
                                        );
                                        selectedAnswer && setAnswer(option)
                                    }}
                                    className='border border-primary rounded-md bg-gray-200 py-2 px-4 flex-grow mr-2'
                                />
                                <Button
                                    title={<img src={del} alt='delete' className="" />}
                                    btnStyles='rounded-md'
                                    btnClick={() =>
                                        handleRemoveOption(index)
                                    }
                                />
                            </div>
                        ))}
                        <Button
                            title={
                                <div className='flex gap-2 text-white'>
                                    <img
                                        src={add}
                                        alt=''
                                    />
                                    <div>Add Option</div>
                                </div>
                            }
                            btnStyles='px-4 py-3 bg-cardgreen rounded-md'
                            btnClick={handleAddOption}
                        />
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center gap-4 my-10'>
                <div
                    className='text-xl flex gap-4 items-center w-1/3 cursor-pointer'
                    onClick={handleAddQuestion}>
                    <img
                        src={add}
                        alt='add more questions'
                    />
                    <div>Add More</div>
                </div>
            </div>
            {questionDetails.length >= 0 ? (
                <div className='mb-4'>
                    <h2 className='text-2xl font-bold mb-2'>
                        Questions
                    </h2>
                    {questionDetails.map((question, index) => (
                        <div
                            key={index}
                            className='mb-4 flex flex-col gap-4'>
                            <h3 className='text-lg font-bold'>
                                Question {index + 1}:{" "}
                                {question.question}
                            </h3>
                            <p>
                                Answer:{" "}
                                <span className='font-semibold'>
                                    {question.answer}
                                </span>
                            </p>
                            <div className='flex flex-col'>
                                {question.options.map((option, i) => (
                                    <div key={i} className='ml-2'>{String.fromCharCode(65 + i)}. {option}</div>
                                ))}
                            </div>
                            <hr className='mt-6' />
                        </div>
                    ))}
                    <div className='flex justify-end'>
                        <Button
                            title='Save Questions'
                            btnStyles='px-4 py-3 text-white bg-primary rounded-md w-1/3'
                            btnClick={handleSaveQuestions}
                        />
                    </div>
                </div>
            ) : (
                <div>No questions added yet</div>
            )}
        </div>
    );
};
