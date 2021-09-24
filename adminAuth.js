const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		return res.send(false);
	}

	try {
		const decoded = jwt.verify(token, "secretkey");
		req.decoded = decoded;
		next();
	} catch (er) {
		return res.send("a problem occured", er.message);
	}
};
