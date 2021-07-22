import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;

const Login = ({ onSubmitHandler }) => {
	const history = useHistory();
	const [data, setdata] = useState({ firstName: "", lastName: "" });

	function changeHandler(e) {
		setdata({ ...data, [e.target.name]: e.target.value });
	}

	// Submit Function
	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/login", data);

			onSubmitHandler(data);
			if (response.status == 200) {
				history.push("/dashboard");
			}
		} catch (e) {
			console.log("error occured while submitting form", e);
		}
	};

	return (
		<div className="container">
			<div className="form-group">
				<label for="exampleInputEmail1">First Name</label>
				<input
					type="text"
					className="form-control"
					name="firstName"
					value={data.firstName}
					onChange={changeHandler}
					id="exampleInputEmail1"
					placeholder="Enter email"
				/>
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Last Name</label>
				<input
					type="text"
					className="form-control"
					name="lastName"
					value={data.lastName}
					onChange={changeHandler}
					id="exampleInputPassword1"
					placeholder="Password"
				/>
			</div>

			<button
				type="button"
				onClick={submitHandler}
				className="btn btn-primary"
			>
				Submit
			</button>
		</div>
	);
};

export default Login;
