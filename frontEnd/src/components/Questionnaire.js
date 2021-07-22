import react, { Component } from "react";
import dataSet from "../api/dataSet";
import QuizArea from "./QuizArea";
import ScoreArea from "./ScoreArea";

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			dataSet: dataSet,
			correct: 0,
			incorrect: 0,
			isFinished: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(choice) {
		if (choice === this.state.dataSet[this.state.current].correct) {
			this.setState({ correct: this.state.correct + 1 });
		} else {
			this.setState({ incorrect: this.state.incorrect + 1 });
		}

		if (this.state.current === this.state.dataSet.length - 1) {
			this.setState({ isFinished: true });
		} else {
			this.setState({ current: this.state.current + 1 });
		}
	}
	render() {
		console.log("firstname value in quiz area", this.props.firstName);
		return (
			<div>
				<QuizArea
					handleClick={this.handleClick}
					isFinished={this.state.isFinished}
					correct={this.state.correct}
					dataSet={this.state.dataSet[this.state.current]}
					firstName={this.props.firstName}
				/>
				<ScoreArea
					correct={this.state.correct}
					incorrect={this.state.incorrect}
				/>
			</div>
		);
	}
}
export default Questionnaire;
