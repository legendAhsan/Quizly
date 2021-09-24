import React, { Component } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

class Logout extends Component {
	async componentDidMount() {
		try {
			Cookies.remove("jwt");
			Cookies.remove("admin");
			Cookies.remove("quizID");
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div>
				<Navbar />
				<h3>You are successfully logged Out.</h3>
			</div>
		);
	}
}

export default React.memo(Logout);
