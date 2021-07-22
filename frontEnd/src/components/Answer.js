import react from "react";

function Answer(props) {
	return (
		<div>
			<button
				type="button"
				onClick={() => props.handleClick(props.choice)}
			>
				{props.answer}
			</button>
		</div>
	);
}

export default Answer;
