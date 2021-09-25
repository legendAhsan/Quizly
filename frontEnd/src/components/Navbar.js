import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
	// console.log("navbar rendered",firstName);
	const [emal, setEmail] = useState({ jwt: "", admin: "" });
	useEffect(() => {
		setEmail({
			jwt: Cookies.get("jwt") ? Cookies.get("jwt") : "",
			admin: Cookies.get("admin") === true ? Cookies.get("admin") : "",
		});
		console.log(Cookies.get("admin"));
	}, []);
	return (
		<div>
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<Link className="navbar-brand" to="#">
					Quiz
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					// aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/dashboard">
								Home <span className="sr-only">(current)</span>
							</Link>
						</li>
						{emal.jwt !== "" ? (
							<>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/create-quiz"
									>
										Create Quiz
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/join-quiz">
										Join Quiz
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/history">
										History
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/logout">
										Logout
									</Link>
								</li>
							</>
						) : (
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
