import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ title, description, quizID, deleteQuiz }) => {
	const [data, setData] = useState([]);
	const [ownerShip, setOwnerShip] = useState([]);
	useEffect(() => {
		async function getAttemptData() {
			let uaq = await axios.get("/quiz-attempted", {
				params: { quizID: quizID },
			});
			setData(uaq.data.data);
			setOwnerShip(uaq.data.ownerShip);
			console.log(ownerShip.length);
		}
		getAttemptData();
	}, []);
	return (
		<div className="card">
			<div className="card-body">
				<div>
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{description}</p>
				</div>
			</div>
			{data.length !== 0
				? `Attempted this quiz on ${data[0].attemptDate.substring(
						0,
						10,
				  )}Your score is ${data[0].score}% `
				: ""}
			<Link
				to="/home"
				type="button"
				onClick={() => Cookies.set("quizID", quizID)}
			>
				Take Quiz
			</Link>

			{ownerShip.length !== 0 && (
				<div>
					<p>{`Quiz ID: ${quizID}`}</p>
					<button type="button" onClick={() => deleteQuiz(quizID)}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default Card;
