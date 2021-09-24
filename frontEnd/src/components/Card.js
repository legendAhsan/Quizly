import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Card = ({ title, description, quizID, deleteQuiz }) => {
	return (
		<div className="card">
			<div className="card-body">
				<Link to="/home" onClick={() => Cookies.set("quizID", quizID)}>
					<div>
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
					</div>
				</Link>
			</div>
			<button type="button" onClick={() => deleteQuiz(quizID)}>
				Delete
			</button>
		</div>
	);
};

export default Card;
