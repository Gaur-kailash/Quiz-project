import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';


function AdminContent() {
    const {quiz,setQuiz,updateFlag,setUpdateFlag} = useContext(AppContext);
    console.log(quiz,"on admin")
    const user = JSON.parse(localStorage.getItem('user'));
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const questions = [...quizData.questions];
        questions[index][name] = value;
        setQuizData({ ...quizData, questions });
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const { value } = e.target;
        const questions = [...quizData.questions];
        questions[questionIndex].options[optionIndex] = value;
        setQuizData({ ...quizData, questions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, { text: '', type: '', options: [], correctAnswer: '' }]
        });
    };

    const addOption = (questionIndex) => {
        const questions = [...quizData.questions];
        questions[questionIndex].options.push('');
        setQuizData({ ...quizData, questions });
    };

    const handelDelete = async()=>{
        try{
            const result = await fetch(`http://localhost:5000/api/quizzes/${quiz['_id']}/delete`,{
                method : 'DELETE',
                headers : {'Cotnent-Type' : "application/json",
                'Authorization' : user.token}
            })
            setUpdateFlag(!updateFlag);
            setQuiz({})
        }
        catch(err){
            console.log("Error while deleting",err);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let data = quizData;
        console.log("data",data)
        if(quiz.questions){
            try{
                let result = await fetch(`http://localhost:5000/api/quizzes/${quiz['_id']}/edit`,{
                    method:'PUT',
                    headers : {
                        'Content-Type' : "application/json",
                        'Authorization' : user.token
                    },
                    body : JSON.stringify(data)
                })
                result = await result.json();
                setUpdateFlag(!updateFlag);
                setQuiz({})
            }catch(err){
                console.log("error while submiting err : ",err)
            }
        }else{
            try{
        data = {...data,author:user.userId};
                let result = await fetch('http://localhost:5000/api/quizzes/create',{
                    method:'POST',
                    headers : {
                        'Content-Type' : "application/json",
                        'Authorization' : user.token
                    },
                    body : JSON.stringify(data)
                })
                result = await result.json();
                setUpdateFlag(!updateFlag)
                setQuiz({})
            }catch(err){
                console.log("error while submiting err : ",err)
            }
        }
        // Handle form submission (e.g., send data to backend)
        console.log(quizData,"on submit");

        // Reset form fields after submission if needed
        setQuizData({ title: '', description: '', questions: [] });
    };
    useEffect(()=>{
        if(quiz.questions){
        setQuizData(quiz)}
    },[quiz])
    return (
            <div className="content">
                <div>{quiz.questions?<h3>Update Quiz here</h3>:<h3>Add a new Quiz here</h3>}</div>
                <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={quizData.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={quizData.description} onChange={handleInputChange} required></textarea>
            </div>
            {quizData.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <div className="form-group">
                        <label>Question Text</label>
                        <input type="text" className="form-control" name="text" value={question.text} onChange={(e) => handleQuestionChange(questionIndex, e)} required />
                    </div>
                    <div className="form-group">
                        <label>Question Type</label>
                        <select className="form-control" name="type" value={question.type} onChange={(e) => handleQuestionChange(questionIndex, e)} required>
                            <option value="">Select Type</option>
                            <option value="MCQ">MCQ</option>
                            <option value="Yes/No">Yes/No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Options</label>
                        {question.options.map((option, optionIndex) => (
                            <input type="text" className="form-control mb-2" key={optionIndex} value={option} onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)} required />
                        ))}
                        <button type="button" className="btn btn-primary btn-sm mb-3 m-2" onClick={() => addOption(questionIndex)}>Add Option</button>
                    </div>
                    <div className="form-group">
                        <label>Correct Answer</label>
                        <input type="text" className="form-control" name="correctAnswer" value={question.correctAnswer} onChange={(e) => handleQuestionChange(questionIndex, e)} required />
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-primary my-3 mx-2" onClick={addQuestion}>Add Question</button>
            <div className='container'><button type="submit" className="btn btn-success m-1">{quiz.questions?"Update":"Submit"}</button>
            {quiz.questions?<button className='btn btn-danger m-1' onClick={()=>handelDelete()}>Delete</button>:""}
            </div>

        </form>
            </div>
    )
}

export default AdminContent