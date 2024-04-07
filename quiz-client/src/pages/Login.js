import React, { useContext, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppProvider';

const Login = () => {
    const {setUser} = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [err,setErr] = useState('');
    const [password, setPassword] = useState('');
    const [userType,setUserType] = useState('Admin');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let result = await fetch("http://localhost:5000/api/auth/login",{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({username,password,userType})
            })
            result = await result.json();
            setUser(result);
            console.log(result,"result while loggin");
            if(result.token){
                localStorage.setItem('user',JSON.stringify(result));
                navigate('/');
            }else if(result.message){
                setErr(result.message);
            }
        }catch(err){
            console.log("Error while loggin ",err)
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-7 border p-0">
                    <img src="https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg" alt="imag" className="img-fluid" width="100%" height="100%" />
                </div>
                <div className="col-md-5 border p-0" style={{backgroundColor:'#77b5ff'}}>
                    <div className="p-4">
                        <h2 className="mb-4">Login Here</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-1">
                                <label>Username:</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group my-1">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="form-group my-1">
                                <label>User Type:</label>
                                <select name='user-type' className='mx-1' value={userType} onChange={(e)=>{setUserType(e.target.value,"option")}} >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div className='container text-center my-3'>
                            {err && <div className='text-danger my-1'>{err}</div>}
                            <button type="submit" className="btn btn-success">Login Here</button>
                            <div className='my-1'>Not an user ? <Link to="/register">Register Here</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
