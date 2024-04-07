import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {setQuiz } = useContext(AppContext)
    const [quizzes,setQuizzes] = useState([]);
    const fetchData = async()=>{
        if(user.userType === 'Admin'){
            let result = await fetch(`http://localhost:5000/api/quizzes/${user.userId}`,{
                headers : {
                    'Content-Type' : "application/json",
                    'authorization' : user.token
                }
            });
            result = await result.json();
            if(!result.message)
            setQuizzes(result)
        }else{
            let result = await fetch('http://localhost:5000/api/quizzes/',{
                headers : {
                    'Content-Type' : "application/json",
                    'authorization' : user.token
                }
            });
            result = await result.json();
            if(!result.message)
            setQuizzes(result)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div className="col-md-3">
        {user.userType === 'User' ? <div>
                <h2>Quizzes</h2>
                <ul className="list-group">
                    {quizzes?.map(quiz => (
                        <li key={quiz.id} className="list-group-item" onClick={() =>{setQuiz(quiz)}}>
                            {quiz.title}
                        </li>
                    ))}
                </ul>
            </div>:<div>
                <h2>My Quizzes</h2>
                <ul className="list-group">
                    {quizzes?.map(quiz => (
                        <li key={quiz.id} className="list-group-item" onClick={() =>{setQuiz(quiz)}}>
                            {quiz.title}
                        </li>
                    ))}
                </ul>
            </div>}
        </div>  
    );
};

export default Sidebar;
