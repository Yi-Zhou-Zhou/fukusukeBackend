const jwt = require('jsonwebtoken');
const secret = "CHANGE_THIS_TOKEN_SECRET"

module.exports = (req, res, next) => {
	try {
		const token = req.header('x-auth-token');
		if (!token) return res.status(401).send('Access denied. No token provided.');

		const decoded = jwt.verify(token, secret);
		req.userData = decoded;
		next();
		
	} catch (error) {
		res.status(400).json({
			message: "Invalid token"
		})
	}
}