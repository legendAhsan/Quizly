import Answer from "./Answer";

function AnswerList(props) {
	const options = [];

	for (let i = 0; i < props.options.length; i++) {
		options.push(
			<Answer
				key={props.options[i]._id}
				choice={props.options[i]._id}
				handleClick={props.handleClick}
				answer={props.options[i].answer}
			/>,
		);
	}
	return <div>{options}</div>;
}
export default AnswerList;
