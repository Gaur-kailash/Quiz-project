import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/AppProvider';

function UserContent() {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: []
    });
    const {quiz} = useContext(AppContext);
    useEffect(()=>{
        if(quiz.questions){
            console.log(quiz,"quiz in user")
        setQuizData(quiz)}
    })
  return (
    <div className="content">
                <h2>{quizData.title}</h2>
                <p>{quizData.description}</p>
                {quizData.questions.map((question,i)=>{
                    return (
                        <div className='form-group'>
                            <label>{i+1}.{question.text}</label>
                            {question.options.map((option,index)=>{
                                return(
                                    <div className='form-control'>
                                    <input type='radio' name={question.text} id={index} value={option}/>
                                    <label htmlFor={index}>{option}</label>
                                    </div>
                                )
                            })}
                        </div>  
                    )
                })}
            </div>
  )
}

export default UserContent