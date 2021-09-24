import { Component } from "react";
import axios from "axios";
import QuizArea from "./QuizArea";
import ScoreArea from "./ScoreArea";
import Cookies from "js-cookie";

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			dataSet: [],
			correct: 0,
			incorrect: 0,
			isFinished: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (Cookies.get("quizID")) {
			axios
				.post("/questions", { quizID: Cookies.get("quizID") })
				.then((res) => {
					this.setState({ ...this.state, dataSet: res.data });
				});
		} else {
			alert("Please select a quiz first");
			window.location.href = "/dashboard";
		}
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
		return (
			<div>
				{this.state.dataSet.length === 0 ? (
					<h6>Data not available</h6>
				) : (
					<div>
						<QuizArea
							handleClick={this.handleClick}
							isFinished={this.state.isFinished}
							correctScore={this.state.correct}
							data={this.state.dataSet[this.state.current]}
						/>
						<ScoreArea
							correct={this.state.correct}
							incorrect={this.state.incorrect}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default Questionnaire;
