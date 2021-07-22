import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import axios from "axios";

const Home = ({ firstName, onSubmitHandler }) => {
	console.log("home component rerender");
	const history = useHistory();

	const [data, setdata] = useState({ loader: true, err: "" });

	var axiosInterceptor = null;
	if (!!axiosInterceptor || axiosInterceptor === 0) {
		axios.interceptors.request.eject(axiosInterceptor);
	}
	axiosInterceptor = axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				error.data = error.response.data;
			}
			return Promise.reject(error);
		},
	);

	useEffect(() => {
		axios
			.get("/api/dashboard")
			.then((res) => {
				if (res.data) {
					setdata({ loader: false, err: "" });
				} else {
					onSubmitHandler({ firstName: "", lastName: "" });
					history.push("/");
				}
			})
			.catch((e) => {
				setdata({ loader: false, err: e.data });
				onSubmitHandler({ firstName: "", lastName: "" });
			});
	}, [firstName]);
	console.log("in home firstname value", firstName);
	return (
		<div>
			{data.loader ? (
				<h3>Loading...</h3>
			) : data.err !== "" ? (
				<h3>{data.err}</h3>
			) : (
				<div>
					<h1>JavaScript Quiz</h1>
					<Questionnaire firstName={firstName} />
				</div>
			)}
		</div>
	);
};

export default Home;
