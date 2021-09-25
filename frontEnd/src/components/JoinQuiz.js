import React, { useState } from "react";
import { useHistory } from "react-router";

const JoinQuiz = () => {
	const history = useHistory();
	const [quiz, setQuiz] = useState("");

	function submitHandler() {
		console.log("quiz value in jpoin quiz", quiz);
		history.push(`/join-quiz/${quiz}`);
	}
	return (
		<div>
			<input
				type="text"
				value={quiz}
				onChange={(e) => setQuiz(e.target.value)}
			/>
			<button type="button" onClick={submitHandler}>
				Join Quiz
			</button>
		</div>
	);
};

export default JoinQuiz;
