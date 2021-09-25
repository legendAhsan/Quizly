import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;

const Register = () => {
	const history = useHistory();
	const [data, setdata] = useState({ email: "", password: "" });

	function changeHandler(e) {
		setdata({ ...data, [e.target.name]: e.target.value });
	}

	// Submit Function
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/register", data);

			if (response.status === 200) {
				history.push("/");
			}
		} catch (e) {
			alert("Email is already Registered. Try with another one.");
			console.log("error occured while submitting form", e);
		}
	};

	return (
		<div className="container">
			<div className="form-group">
				<label for="registerEmail">Email</label>
				<input
					type="text"
					className="form-control"
					name="email"
					value={data.email}
					onChange={changeHandler}
					id="registerEmail"
					placeholder="Enter email"
				/>
			</div>
			<div class="form-group">
				<label for="registerPassword">Last Name</label>
				<input
					type="text"
					className="form-control"
					name="password"
					value={data.password}
					onChange={changeHandler}
					id="registerPassword"
					placeholder="Password"
				/>
			</div>

			<button
				type="button"
				onClick={submitHandler}
				className="btn btn-primary"
			>
				Register
			</button>
		</div>
	);
};

export default Register;
