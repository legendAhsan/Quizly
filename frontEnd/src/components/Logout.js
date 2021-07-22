import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
	async componentDidMount() {
		// if (this.props.firstName !== "") {
		try {
			console.log("in the try block of logout component");
			const res = await axios.get("/api/logout");
			if (res.data == true) {
				console.log("if block mai");
				this.props.onSubmitHandler({ firstName: "", lastName: "" });
			}
		} catch (e) {
			console.log(e);
			this.props.onSubmitHandler({ firstName: "", lastName: "" });
		}
		// }
	}
	componentWillUnmount() {
		console.log("Logout unmounted");
	}
	render() {
		return (
			<div>
				<h3>You are successfully logged Out.</h3>
			</div>
		);
	}
}

export default React.memo(Logout);
