import react from "react";
import Question from "./Question";
import AnswerList from "./AnswerList";
import UserGreeting from "./UserGreeting";
function QuizArea(props) {
	if (props.isFinished === true) {
		return (
			<UserGreeting correct={props.correct} firstName={props.firstName} />
		);
	}

	return (
		<div>
			<Question dataSet={props.dataSet} />
			<AnswerList
				handleClick={props.handleClick}
				dataSet={props.dataSet.options}
			/>
		</div>
	);
}

export default QuizArea;
