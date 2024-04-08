// src/context/AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [quiz, setQuiz] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false)

    return (
        <AppContext.Provider value={{ user, setUser ,quiz,setQuiz,updateFlag,setUpdateFlag}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
