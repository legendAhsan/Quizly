import { useState, useCallback } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Secret from "./components/Secret";
import Home from "./components/Home";
import Logout from "./components/Logout";

function App() {
	const [data, setdata] = useState({ firstName: "", lastName: "" });

	const onSubmitHandler = (valuesPassed) => {
		console.log("Submit Handler Function");
		setdata({
			firstName: valuesPassed.firstName,
			lastName: valuesPassed.lastName,
		});
	};

	return (
		<div className="App">
			<Router>
				<Navbar firstName={data.firstName} />
				<Switch>
					<Route
						path="/"
						exact
						render={() => (
							<Login onSubmitHandler={onSubmitHandler} />
						)}
					/>
					<Route
						exact
						path="/dashboard"
						component={() => (
							<Home
								firstName={data.firstName}
								onSubmitHandler={onSubmitHandler}
							/>
						)}
					/>
					<Route
						exact
						path="/logout"
						render={() => (
							<Logout
								onSubmitHandler={onSubmitHandler}
								firstName={data.firstName}
							/>
						)}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
