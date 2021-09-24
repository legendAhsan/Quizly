import React from "react";
import Navbar from "./Navbar";
import CreateOption from "./CreateOption";
import CreateQuestion from "./CreateQuestion";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import axios from "axios";
const mongoose = require("mongoose");

const CreateQuiz = () => {
	const history = useHistory();
	const [basicINFO, setBasicINFO] = useState({});
	const [questions, setQuestions] = useState([]);
	function mountBasicInfo(id) {
		setBasicINFO({ _id: id, title: "", description: "" });
	}
	function addQuestion(quizID) {
		let questionID = mongoose.Types.ObjectId();
		setQuestions([
			...questions,
			{
				_id: questionID,
				quiz_id: quizID,
				question: "",
				answers: [
					{
						_id: mongoose.Types.ObjectId(),
						answer: "",
					},
					{
						_id: mongoose.Types.ObjectId(),
						answer: "",
					},
				],
				correct: "",
			},
		]);
	}

	function updateQuestion(id, text) {
		setQuestions(
			questions.map((q) => (q._id === id ? { ...q, question: text } : q)),
		);
	}

	function updateCorrectOption(qid, text) {
		setQuestions(
			questions.map((q) => (q._id === qid ? { ...q, correct: text } : q)),
		);
	}

	function moreOption(id) {
		let aid = mongoose.Types.ObjectId();
		setQuestions(
			questions.map((q) =>
				q._id === id
					? {
							...q,
							answers: [...q.answers, { _id: aid, answer: "" }],
					  }
					: q,
			),
		);
	}

	function updateOption(qid, aid, text) {
		setQuestions(
			questions.map((q) =>
				q._id === qid
					? {
							...q,
							answers: q.answers.map((a) =>
								a._id === aid ? { ...a, answer: text } : a,
							),
					  }
					: q,
			),
		);
	}

	useEffect(() => {
		let quiz_id = mongoose.Types.ObjectId();
		Cookies.set("quizID", quiz_id);
		mountBasicInfo(quiz_id);
		addQuestion(quiz_id);
	}, []);
	const submitQuizHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/create-quiz", {
				basicINFO: basicINFO,
				questions: questions,
			});

			if (response.status === 200) {
				alert(response.data);
				history.push("/dashboard");
			}
		} catch (e) {
			alert("Cannot submit quiz");
		}
	};
	return questions.length != 0 ? (
		<>
			<Navbar />
			<div>
				<form onSubmit={submitQuizHandler}>
					<div className="form-group">
						<label htmlfor="title">Title</label>
						<input
							type="text"
							className="form-control-file"
							onChange={(e) =>
								setBasicINFO({
									...basicINFO,
									title: e.target.value,
								})
							}
							value={basicINFO.title}
							id="title"
						/>
					</div>
					<div className="form-group">
						<label htmlfor="description">Description</label>
						<input
							type="text"
							className="form-control-file"
							onChange={(e) =>
								setBasicINFO({
									...basicINFO,
									description: e.target.value,
								})
							}
							value={basicINFO.description}
							id="description"
						/>
					</div>
					<h6>Questions</h6>
					{questions.map((ques) => {
						return (
							<CreateQuestion
								id={ques._id}
								updateQuestion={updateQuestion}
								moreOption={moreOption}
								updateOption={updateOption}
								updateCorrectOption={updateCorrectOption}
								question={ques.question}
								answers={ques.answers}
								correct={ques.correct}
							/>
						);
					})}

					<button
						type="button"
						onClick={() => addQuestion(Cookies.get("quizID"))}
					>
						Add Question
					</button>
					<button type="submit">Create Quiz</button>
				</form>
			</div>
		</>
	) : (
		<h1>"No Question"</h1>
	);
};

export default CreateQuiz;
