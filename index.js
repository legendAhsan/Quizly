const express = require("express");
const mongoose = require("mongoose");
const { Users, Quiz, Question, UAQ } = require("./Schema");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const auth = require("./auth.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
	.connect("mongodb://localhost:27017/firstdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connection successfull"))
	.catch((err) => console.log("err", err));

app.post("/register", async (req, res) => {
	let UserRecord = new Users({
		email: req.body.email,
		password: req.body.password,
		adminStatus: req.body.admin,
	});

	await UserRecord.save();
	res.send("User created successfully.");
});

// working fine
app.post("/login", async (req, res) => {
	let data = await Users.find({ email: req.body.email });
	if (data.length === 0) {
		res.status(404).send("User not exist");
		return;
	}

	let match = await bcrypt.compare(req.body.password, data[0].password);
	if (!match) {
		res.status(500).send("password not match");
		return;
	} else {
		let token = await data[0].generateToken();
		res.send({ token: token, admin: data[0].adminStatus });
	}
});

app.post("/create-quiz", auth, (req, res) => {
	let quiz = new Quiz({
		_id: req.body.basicINFO._id,
		uid: req.decoded._id,
		title: req.body.basicINFO.title,
		description: req.body.basicINFO.description,
	});

	quiz.save()
		.then((dat) => {
			console.log(dat);
		})
		.catch((err) => {
			console.log("Error while saving basic info of quiz.", err);
			return;
		});

	Question.insertMany(req.body.questions)
		.then(() => {
			console.log("Question inserted.");
			res.send("Quiz Created.");
		})
		.catch((err) => {
			console.log("An error occured while inserting questions ", err);
			res.send("An error occured while inserting questions ");
		});
});

app.post("/dashboardhandler", auth, async (req, res) => {
	let data = await Quiz.find({ uid: req.decoded._id });
	if (data.length === 0) {
		return res.send("No quiz");
	}
	res.send(data);
});

app.post("/delete-quiz", auth, async (req, res) => {
	console.log(req.body.id);
	await Quiz.deleteOne({ _id: req.body.id });
	await Question.deleteMany({ quiz_id: req.body.id });
	res.send("Quiz Deleted Successfully");
});

app.post("/questions", auth, async (req, res) => {
	let data = await Question.find({ quiz_id: req.body.quizID });
	console.log(data);
	res.send(data);
});

app.post("/quiz-attempted", auth, async (req, res) => {
	let data = new UAQ({
		_id: req.decoded._id,
		quiz_id: req.body.quizID,
		score: req.body.score,
	});
	await data.save();
	res.send(true);
});

app.get("/quiz-attempted", auth, async (req, res) => {
	let attempt = await UAQ.find({
		_id: req.decoded._id,
		quiz_id: req.query.quizID,
	});

	let ownerShip = await Quiz.find({
		uid: req.decoded._id,
		_id: req.query.quizID,
	});

	res.send({ data: attempt, ownerShip: ownerShip });
});

app.post("/quiz", auth, async (req, res) => {
	let data = await Quiz.find({ _id: req.body.quizID });
	res.send(data);
});

app.post("/quiz-history", auth, async (req, res) => {
	let d = await UAQ.find({ _id: req.decoded._id });
	let arr = d.map((a) => a.quiz_id);
	let data = await Quiz.find({ _id: { $in: arr } });
	res.send(data);
});

app.listen(5000, () => console.log("server is listening"));
