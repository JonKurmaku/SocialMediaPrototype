import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <form className='login-form'>
            <label htmlFor="">Email *</label>    
            <input className='infos' type="email" {...register("email", { required: true })} placeholder='Enter Your Email Address' />
            {errors.email && <span className="notifications">Email is mandatory</span>}

            <label htmlFor="">Password *</label>    
            <input className='infos' type="password" {...register("password", { required: true })} placeholder='Enter Password' />
            {errors.password && <span className="notifications">Password is mandatory</span>}

            <input type="submit" value="Log In" />
            </form>
        </>
    )
}

export default Login;
