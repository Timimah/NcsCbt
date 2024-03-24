import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';
import { Button } from '../../../components/shared/Button';

export const QuestionPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [questionCategory, setQuestionCategory] = useState('');

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('savedQuestions')) || [];
    const questionCategoryFromState = location.state?.questionCategory;

    const questionsForCategory = savedQuestions.find(
      (item) => item.category === questionCategoryFromState
    );

    if (questionsForCategory) {
      setQuestions(questionsForCategory.questions);
      setQuestionCategory(questionsForCategory.category);
    }
  }, [location.state]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-8">
      <Header title={`Question Preview - ${questionCategory}`} />
      <div className="mt-4 flex justify-end">
        <Button
          title="Go Back"
          btnStyles="px-4 py-2 rounded-md bg-primary text-white"
          btnClick={handleGoBack}
        />
      </div>
      {questions.length > 0 ? (
        <div className="mt-8">
          {questions.map((question, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-lg font-bold">Question {index + 1}</h2>
              <p className="mt-2">{question.question}</p>
              {question.options && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Options:</h3>
                  <ul className="list-disc list-inside">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">No questions found.</div>
      )}
    </div>
  )
}
