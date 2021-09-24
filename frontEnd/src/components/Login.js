import React, { useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

axios.defaults.withCredentials = true;

const Login = () => {
	const history = useHistory();
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	function changeHandler(e) {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	}

	// Submit Function
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/login", loginData);

			if (response.status === 200) {
				Cookies.set("jwt", response.data.token);
				Cookies.set("admin", response.data.admin);
				history.push("/dashboard");
			}
		} catch (e) {
			alert("Wrong credentials");
		}
	};
	if (Cookies.get("jwt")) {
		history.push("/dashboard");
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">First Name</label>
					<input
						type="text"
						className="form-control"
						name="email"
						value={loginData.email}
						onChange={changeHandler}
						id="exampleInputEmail1"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Last Name</label>
					<input
						type="text"
						className="form-control"
						name="password"
						value={loginData.password}
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
				<div>
					<h6>Don't have a account? Register Now</h6>
					<Link
						className="btn btn-success"
						type="button"
						to="/register"
					>
						Register Now!
					</Link>
				</div>
			</div>
		</>
	);
};

export default Login;
