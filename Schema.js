const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: String,
	adminStatus: { type: Boolean },
});

const QuizSchema = new mongoose.Schema({
	title: String,
	description: String,
	DOC: { type: Date, default: Date.now },
});

const QuestionSchema = new mongoose.Schema({
	quiz_id: { type: String },
	question: { type: String },
	answers: [
		{
			answer: { type: String },
		},
	],
	correct: { type: String },
});

const LogSchema = new mongoose.Schema({
	email: { type: String },
	data: {
		q_id: { type: String },
		a_id: { type: String },
	},
});

const UAQSchema = new mongoose.Schema({
	email: String,
	quiz_id: String,
	attemptDate: { type: Date, default: Date.now },
});

UserSchema.methods.generateToken = async function () {
	let token = await jwt.sign({ _id: this._id }, "secretkey");
	return token;
};
UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		let pass = await bcrypt.hash(this.password, 10);
		this.password = pass;
	}
	next();
});

const Users = mongoose.model("LoginDetail", UserSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);
const Question = mongoose.model("Question", QuestionSchema);
const Log = mongoose.model("LogData", LogSchema);
const UAQ = mongoose.model("UAQ", UAQSchema);

module.exports = { Users, Quiz, Question, Log, UAQ };
