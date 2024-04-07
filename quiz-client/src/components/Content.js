import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import UserContent from './UserContent';
import AdminContent from './AdminContent';

const Content = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <div className="col-md-9">
            {user.userType === 'User'?<UserContent/>: <AdminContent/>
            }
        </div>
    );
};

export default Content;
