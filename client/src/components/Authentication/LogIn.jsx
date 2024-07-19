import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if(!email || !password) {
            alert('Please fill all required fields');
            setLoading(false);
            return;
        }

        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const {data} = await axios.post("/api/user/login", {email, password}, config);
            console.log(data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        }catch(error){
            console.error(error);
            alert('Error logging in: ' + error.message);
            setLoading(false);
        }

    }

    return (
        <>
            <form className='login-form' onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="">Email *</label>
                <input className='infos' type="email" {...register("email", { required: true })} placeholder='Enter Your Email Address' onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span className="notifications">Email is mandatory</span>}

                <label htmlFor="">Password *</label>
                <input className='infos' type="password" {...register("password", { required: true })} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <span className="notifications">Password is mandatory</span>}

                <input type="submit" value="Log In" disabled={loading}/>
            </form>
        </>
    )
}

export default Login;
