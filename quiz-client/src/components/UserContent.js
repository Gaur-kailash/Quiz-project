import React, { useContext, useState ,useEffect} from 'react';
import { AppContext } from '../context/AppProvider';

function UserContent() {
    const { quiz } = useContext(AppContext);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: []
    });

    const handleOptionChange = (questionIndex, optionIndex,value) => {
        const newAnswers = { ...userAnswers };
        newAnswers[questionIndex] = value;
        console.log(newAnswers,value,"Answers")
        setUserAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let userScore = 0;
        quiz.questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                userScore++;
            }
        });
        setScore(userScore);
    };
    useEffect(()=>{
        if(quiz.questions){
        setQuizData(quiz)}
    })

    return (
        <>
        {quiz.questions?<div className="content">
            <h2>{quizData.title}</h2>
            <p>{quizData.description}</p>
            {quizData.questions.map((question, questionIndex) => (
                <div className='form-group my-1' key={questionIndex}>
                    <label>{questionIndex + 1}.{question.text}</label>
                    {question.options.map((option, optionIndex) => (
                        <div className='form-control' key={optionIndex}>
                            <input
                                type='radio'
                                name={questionIndex}
                                id={optionIndex}
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex,e.target.value)}
                            />
                            <label className='mx-1' htmlFor={optionIndex}>{option}</label>
                        </div>
                    ))}
                </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
            {score !== null && <p>Your score: {score}/{quiz.questions.length}</p>}
        </div>:<div className='content'><h3>
            Please select an Quiz from Sidebar to start</h3></div>}
        </>
    );
}

export default UserContent;
