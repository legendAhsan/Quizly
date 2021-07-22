import React from "react";
import { Link } from "react-router-dom";

function Navbar({ firstName }) {
	console.log("navbar rendered");
	return (
		<div>
			<nav class="navbar navbar-expand-md navbar-light bg-light">
				<Link class="navbar-brand" to="#">
					Quiz
				</Link>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					// aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul class="navbar-nav mr-auto">
						<li class="nav-item active">
							<Link class="nav-link" to="/dashboard">
								Home <span class="sr-only">(current)</span>
							</Link>
						</li>
						{firstName !== "" ? (
							<li class="nav-item">
								<Link class="nav-link" to="/logout">
									Logout
								</Link>
							</li>
						) : (
							<li class="nav-item">
								<Link class="nav-link" to="/">
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