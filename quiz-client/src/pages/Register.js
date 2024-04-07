import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType,setUserType] = useState('Admin');
    const [err,setErr] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let result = await fetch("http://localhost:5000/api/auth/register",{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({username,email,password,userType})
            })
            result = await result.json();
            console.log(result,"result while registering");
            if(result.token){
                navigate('/login');
            }else if(result.message){
                setErr(result.message);
            }
        }catch(err){
            console.log("Error while registering ",err)
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-7 border p-0">
                    <img src="https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg" alt="imag" className="img-fluid" width="100%" height="100%" />
                </div>
                <div className="col-md-5 border p-0" style={{backgroundColor:'#8ad4df'}}>
                    <div className="p-4">
                        <h2 className="mb-4">Register Here!</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-1">
                                <label>Email:</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
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
                                <select name='user-type' className='mx-1' value={userType} onChange={(e)=>{setUserType(e.target.value)}}>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div className='container text-center my-3'>
                            {err && <div className='text-danger my-1'>{err}</div>}
                            <button type="submit" className="btn btn-success">Register Here</button>
                            <div className='my-1'>Already an user ? <Link to="/login">Login Here</Link></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
