import react from "react";
import Answer from "./Answer";

function AnswerList(props) {
	const options = [];
	for (let i = 0; i < props.dataSet.length; i++) {
		options.push(
			<Answer
				key={i}
				choice={i}
				handleClick={props.handleClick}
				answer={props.dataSet[i]}
			/>,
		);
	}
	return <div>{options}</div>;
}
export default AnswerList;
