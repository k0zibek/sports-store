import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAdress] = useState("");
	const [password, setPassword] = useState("");
	const [answer, setAnswer] = useState("");
	const navigate = useNavigate();

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signup`, {
				name,
				email,
				phone,
				address,
				password,
				answer,
			});
			if (res && res.data.success) {
				toast.success(res && res.data.message);
				navigate("/login");
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<Layout title={"Sign up - Sports store"}>
			<div class='form'>
				<form
					className='form-inputs'
					onSubmit={handleSubmit}
				>
					<h1 class='title'>SIGN UP</h1>
					<div className='input-div'>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							id='name'
							placeholder='Name'
							required
						/>
					</div>
					<div className='input-div'>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id='email'
							placeholder='E-mail'
							required
						/>
					</div>
					<div className='input-div'>
						<input
							type='text'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							id='phone'
							placeholder='Phone Number'
							required
						/>
					</div>
					<div className='input-div'>
						<input
							type='text'
							value={address}
							onChange={(e) => setAdress(e.target.value)}
							id='address'
							placeholder='Address'
							required
						/>
					</div>
					<div className='input-div'>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							id='password'
							placeholder='Password'
							required
						/>
					</div>
					<div className='input-div'>
						<input
							type='text'
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							id='answer'
							placeholder='What is Your best friend name?'
							required
						/>
					</div>
					<div className='button-div'>
						<button
							type='submit'
							className='btn-style'
							id='btn'
						>
							Submit
						</button>
					</div>
					<div class='register-link'>
						<p class='redirect'>
							Already have an account?<NavLink to='/login'>Login now</NavLink>
						</p>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Signup;
