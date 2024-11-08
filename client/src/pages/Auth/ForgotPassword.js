import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [answer, setAnswer] = useState("");

	const navigate = useNavigate();

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
				email,
				newPassword,
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
		<Layout title={"Forgot Password"}>
			<div className='form-container'>
				<div class='form'>
					<form className='form-inputs' onSubmit={handleSubmit}>
						<h1 class='title'>RESET PASSWORD</h1>
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
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								id='password'
								placeholder='New password'
								required
							/>
						</div>
						<div className='input-div'>
							<input
								type='text'
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								id='answer'
								placeholder='Enter Your best friends name'
								required
							/>
						</div>
						<div className='button-div'>
							<button type='submit' className='btn-style' id='btn'>
								Reset
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
