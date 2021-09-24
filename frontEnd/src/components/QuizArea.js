import Question from "./Question";
import AnswerList from "./AnswerList";
import UserGreeting from "./UserGreeting";

function QuizArea(props) {
	if (props.isFinished === true) {
		return <UserGreeting correctScore={props.correctScore} />;
	}

	return (
		<div>
			<Question q={props.data.question} />
			<AnswerList
				handleClick={props.handleClick}
				options={props.data.answers}
			/>
		</div>
	);
}

export default QuizArea;
