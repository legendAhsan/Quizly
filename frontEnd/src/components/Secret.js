import React, { useEffect, useState } from "react";
import axios from "axios";

const Secret = (props) => {
	const [toload, settoload] = useState(false);
	const [data, setdata] = useState("");
	const [err, seterr] = useState("");
	console.log("secret page render");
	var axiosInterceptor = null;
	if (!!axiosInterceptor || axiosInterceptor === 0) {
		axios.interceptors.request.eject(axiosInterceptor);
	}
	axiosInterceptor = axios.interceptors.response.use(
		(response) => {
			console.log("response");
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				console.log("intercepter", error.response.data);
				error.data = error.response.data;
			}
			return Promise.reject(error);
		},
	);

	useEffect(() => {
		axios
			.get("/api/secret")
			.then((res) => {
				console.log("data", res);
				setdata(res.data);
				settoload(true);

				console.log("axios requet in secret sucess happen");
			})
			.catch((e) => {
				console.log("catch block");
				settoload(true);
				seterr(e.data);
			});
	}, []);

	return (
		<div>
			{toload ? (
				err !== "" ? (
					<h1>{err}</h1>
				) : (
					<h1>
						{data} Welcome {props.data.firstName}{" "}
						{props.data.lastName}
					</h1>
				)
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
};

export default Secret;
