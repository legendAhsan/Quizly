import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Card from "./Card";
import axios from "axios";
import Navbar from "./Navbar";

const Quiz = () => {
	const { id } = useParams();
	const history = useHistory();
	const [data, setData] = useState([]);

	function deleteQuiz(id) {
		axios.post("/delete-quiz", { id: id }).then((res) => {
			alert("Quiz Deleted");
			window.location.reload();
		});
	}

	useEffect(() => {
		console.log("quiz id", id);
		axios
			.post("/quiz", { quizID: id })
			.then((res) => {
				if (res.data.length === 0) {
					alert("Wrong Quiz id.");
					history.push("/join-quiz");
				} else {
					setData(res.data);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	return (
		<div>
			<Navbar />
			{data.length === 0 ? (
				""
			) : (
				<Card
					key={id}
					title={data[0].title}
					description={data[0].description}
					quizID={data[0]._id}
					deleteQuiz={deleteQuiz}
				/>
			)}
		</div>
	);
};

export default Quiz;
