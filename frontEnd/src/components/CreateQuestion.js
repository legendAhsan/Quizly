import React from "react";
import CreateOption from "./CreateOption";
import { useState, useEffect } from "react";

const CreateQuestion = (props) => {
	const [questionID, setquestionID] = useState("");
	useEffect(() => {
		setquestionID(props.id);
	}, [props.id, props.answers.length]);
	function optionGenerator() {
		var rows = [];
		for (let i = 0; i < props.answers.length; i++) {
			rows.push(
				<CreateOption
					questionID={questionID}
					ansID={props.answers[i]._id}
					ans={props.answers[i].answer}
					updateOption={props.updateOption}
					i={i}
					updateCorrectOption={props.updateCorrectOption}
				/>,
			);
		}
		return rows;
	}

	function changeQuestionHandler(e) {
		props.updateQuestion(questionID, e.target.value);
	}
	return (
		<div>
			<div className="form-group">
				<input
					type="text"
					class="form-control-file"
					name="question"
					onChange={changeQuestionHandler}
					placeholder="Question"
				/>
			</div>
			{optionGenerator()}
			<button type="button" onClick={() => props.moreOption(questionID)}>
				Add Option
			</button>
		</div>
	);
};

export default CreateQuestion;
