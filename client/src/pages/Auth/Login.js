import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useAuth();

	const navigate = useNavigate();

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
				email,
				password,
			});
			if (res && res.data.success) {
				toast.success(res && res.data.message);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				localStorage.setItem("auth", JSON.stringify(res.data));
				navigate("/");
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
					<h1 class='title'>LOGIN</h1>
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
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							id='password'
							placeholder='Password'
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
							Don't have an account?<NavLink to='/signup'>Sign up Now</NavLink>
						</p>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
