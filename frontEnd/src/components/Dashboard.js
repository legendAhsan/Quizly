import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "../Styles/Dashboard.css";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import Card from "./Card";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function Dashboard() {
	const history = useHistory();
	const [dashboardState, setDashboardState] = useState({
		fetchedRecord: [],
		loading: true,
		error: "",
	});

	useEffect(() => {
		async function fetchDashboard() {
			try {
				const response = await axios.post("/dashboardhandler");
				if (response.data === false) {
					history.push("/");
				} else if (response.data === "No quiz") {
					setDashboardState({
						...dashboardState,
						loading: false,
						error: "There is no quiz available",
					});
				} else {
					setDashboardState({
						fetchedRecord: response.data,
						loading: false,
						error: "",
					});
				}
			} catch (e) {
				alert("dashboard error");
				console.log("error occured while submitting form", e);
			}
		}
		fetchDashboard();
	}, [history]);

	function deleteQuiz(id) {
		axios.post("/delete-quiz", { id: id }).then((res) => {
			alert("Quiz Deleted");
			window.location.reload();
		});
	}

	return dashboardState.loading ? (
		<p>Loading....</p>
	) : dashboardState.error !== "" ? (
		<h6>{dashboardState.error}</h6>
	) : (
		<>
			<Navbar />
			<div id="cardContents">
				{dashboardState.fetchedRecord.map((data, index) => (
					<Card
						key={index}
						title={data.title}
						description={data.description}
						quizID={data._id}
						deleteQuiz={deleteQuiz}
					/>
				))}
			</div>
		</>
	);
}

export default Dashboard;
