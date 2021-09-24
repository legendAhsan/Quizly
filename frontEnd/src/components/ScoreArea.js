import TotalCorrect from "./TotalCorrect";
import TotalIncorrect from "./TotalIncorrect";

function ScoreArea(props) {
	return (
		<div>
			<h2>ScoreArea</h2>
			<TotalCorrect correct={props.correct} />
			<TotalIncorrect incorrect={props.incorrect} />
		</div>
	);
}

export default ScoreArea;
