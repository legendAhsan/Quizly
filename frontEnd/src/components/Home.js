import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Questionnaire from "./Questionnaire";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

const Home = () => {
	const history = useHistory();

	const [data, setdata] = useState({ loader: true });

	useEffect(() => {
		if (Cookies.get("jwt")) {
			setdata({ loader: false });
		} else {
			history.push("/");
		}
	}, [history]);

	return (
		<>
			<Navbar />
			{data.loader ? (
				"Loading..."
			) : (
				<div>
					<Questionnaire />
				</div>
			)}
		</>
	);
};

export default Home;
