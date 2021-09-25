import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import CreateQuiz from "./components/CreateQuiz";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import JoinQuiz from "./components/JoinQuiz";
import Quiz from "./components/Quiz";
import HistoryData from "./components/HistoryData";

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
					<Route
						exact
						path="/join-quiz"
						render={() => <JoinQuiz />}
					/>
					<Route
						exact
						path="/join-quiz/:id"
						render={() => <Quiz />}
					/>
					<Route
						exact
						path="/history"
						render={() => <HistoryData />}
					/>
					<Route exact path="/home" component={() => <Home />} />
					<Route exact path="/logout" render={() => <Logout />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
