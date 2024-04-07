// src/context/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [quiz, setQuiz] = useState({});
    const [create, setCreate] = useState(false)

    return (
        <AppContext.Provider value={{ user, setUser ,quiz,setQuiz}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
