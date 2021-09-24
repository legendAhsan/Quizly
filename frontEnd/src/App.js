import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import CreateQuiz from "./components/CreateQuiz";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact render={() => <Login />} />
					<Route
						exact
						path="/register"
						component={() => <Register />}
					/>
					<Route
						exact
						path="/dashboard"
						component={() => <Dashboard />}
					/>
					<Route
						exact
						path="/create-quiz"
						component={() => <CreateQuiz />}
					/>
					<Route exact path="/home" component={() => <Home />} />
					<Route exact path="/logout" render={() => <Logout />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
