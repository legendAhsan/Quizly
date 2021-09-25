import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const HistoryData = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.post("/quiz-history").then((res) => {
			setData(res.data);
		});
	}, []);

	function deleteQuiz(id) {
		axios.post("/delete-quiz", { id: id }).then((res) => {
			alert("Quiz Deleted");
			window.location.reload();
		});
	}
	return (
		<div>
			{data.length !== 0
				? data.map((q) => (
						<Card
							key={q._id}
							title={q.title}
							description={q.description}
							quizID={q._id}
							deleteQuiz={deleteQuiz}
						/>
				  ))
				: "You have not given any Quiz yet."}
		</div>
	);
};

export default HistoryData;
