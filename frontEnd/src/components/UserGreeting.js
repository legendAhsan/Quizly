import { useEffect } from "react";
import Cookies from "js-cookie";


import axios from "axios";

function UserGreeting(props) {
	useEffect(() => {
		async function statusUpdate() {
			try {
				let score = (props.correctScore / props.totalQuestion) * 100;

				let data = await axios.post("/quiz-attempted", {
					score: score,
					quizID: Cookies.get("quizID"),
				});
			} catch (e) {
				console.log(e);
			}
		}
		statusUpdate();
	}, []);
	return (
		<div>
			<h2>Thank's for completing the quiz</h2>
			<p>
				Status:{" "}
				{props.correctScore >= Math.ceil(props.totalQuestion / 2)
					? `You passed the quiz with ${props.correctScore}/${props.totalQuestion} score.`
					: `Unfortunately you are failed with ${props.correctScore}/${props.totalQuestion} score.`}
			</p>
		</div>
	);
}

export default UserGreeting;
