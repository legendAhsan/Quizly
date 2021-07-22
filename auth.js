const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	// Read the token from the cookie
	const token = req.cookies.jwt;
	if (!token) {
		return res.send(false);
	}

	try {
		const decoded = jwt.verify(token, "secretkey");
		next();
	} catch (er) {
		res.clearCookie("jwt");
		return res.send("a problem occured", er.message);
	}
};
