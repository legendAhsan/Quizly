const express = require("express");
const mongoose = require("mongoose");
const user = require("./Schema");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const auth = require("./auth.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://127.0.0.1:3000",
	}),
);

mongoose
	.connect("mongodb://localhost:27017/firstdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connection successfull"))
	.catch((err) => console.log("err", err));

// const data = ;

app.get("/", async (req, res) => res.send(await user.find()));
app.post("/register", async (req, res) => {
	let data = new user({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		age: req.body.age,
	});

	let token = await data.generateToken();
	let val = await data.save();
	res.send(val);
});

app.post("/login", async (req, res) => {
	let data = await user.find({ firstName: req.body.firstName });
	let match = await bcrypt.compare(req.body.lastName, data[0].lastName);
	if (!match) {
		res.send("password not match");
	} else {
		let token = await data[0].generateToken();
		res.cookie("jwt", token, {
			expires: new Date(Date.now() + 90000),
			httpOnly: true,
		});
		res.send("ok");
	}
});

app.get("/api/dashboard", auth, (req, res) => {
	res.send(true);
});
app.get("/api/logout", (req, res) => {
	res.clearCookie("jwt");
	res.send(true);
});

app.listen(5000, () => console.log("server is listening"));
