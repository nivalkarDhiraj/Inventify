const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Investor = require("../models/investor");
const Innovator = require("../models/innovator");

module.exports = (req, res, next) => {
	if (!req.headers || !userType || (userType != "innovator" && userType != "investor")) {
		res.status(401).json({ error: "You must be logged in" });
		res.end();
	}
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "You must be logged in" });
	} else {
		const token = authorization.replace("Bearer ", "");
		jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
			if (error) {
				return res.status(401).json({ error: error });
			} else {
				const _id = payload.id;
				const { userType } = payload;
				if (userType === "innovator") {
					Innovator.findById(_id)
						.select("-password")
						.then((userData) => {
							req.innovator = userData;
							next();
						});
				} else if (userType === "investor") {
					Investor.findById(_id)
						.select("-password")
						.then((userData) => {
							req.investor = userData;
							next();
						});
				}
			}
		});
	}
};
