import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const postDetails = async (pics) => {
        setLoading(true);
        if (pics === undefined) {
            alert('Please select an image');
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dj66dfpst');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dj66dfpst/image/upload', data);
                setPic(response.data.url.toString());
                setLoading(false);
            } catch (error) {
                alert('Error uploading image: ' + error.message);
                setLoading(false);
            }
        } else {
            alert('Please select a valid image format (jpeg or png)');
            setLoading(false);
        }
    }

    const submitHandler = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("Please enter all required fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user", { name, email, password },config);
            console.log(data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert('Error signing up: ' + error.message);
            setLoading(false);
        }
    };
    return (
        <>
            <form className='signup-form' onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="">Name *</label>
                <input className='infos' type="text" {...register("name", { required: true })} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                {errors.name && <span className="notifications">Name is mandatory</span>}

                <label htmlFor="">Email Address *</label>
                <input className='infos' type="email" {...register("email", { required: true })} placeholder='Enter Your Email Address' onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span className="notifications">Email is mandatory</span>}

                <label htmlFor="">Password *</label>
                <input className='infos' type="password" {...register("password", { required: true })} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <span className="notifications">Password is mandatory</span>}

                <label htmlFor="">Confirm Password *</label>
                <input className='infos' type="password" {...register("passwordConfirm", { required: true })} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.passwordConfirm && <span className="notifications">Password Confirmation is mandatory</span>}

                {/* <label htmlFor="">Upload Your Photo *</label>
                <input className='infos' type="file" {...register("photo")} onChange={(e) => postDetails(e.target.files[0])} />
                {errors.photo && <span className="notifications">Password Confirmation is mandatory</span>} */}

                <input type="submit" value="Sign Up" disabled={loading} />
            </form>
        </>
    );
};

export default Signup;
