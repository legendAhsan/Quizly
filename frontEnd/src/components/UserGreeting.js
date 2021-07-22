import react from "react";

function UserGreeting(props) {
	return (
		<div>
			<h2>Thank's {props.firstName} for completing the quiz</h2>
			<p>
				Status:{" "}
				{props.correct >= 2
					? "You passed the quiz"
					: "Unfortunately you are failed"}
			</p>
		</div>
	);
}

export default UserGreeting;
