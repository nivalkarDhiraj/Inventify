const Innovator = require("../models/innovator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user signup
module.exports.signup = (req, res) => {
	const {
		name,
		email,
		password,
		profile_picture,
		mobileno,
		city,
		district,
		state,
		pincode,
		occupation,
	} = req.body;

	if (
		!name ||
		!email ||
		!password ||
		!mobileno ||
		!city ||
		!district ||
		!state ||
		!pincode ||
		!occupation
	) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
	Innovator.findOne({ email: email }).then((innovator) => {
		if (innovator) {
			return res.status(400).json({ message: "User already exist" });
		} else {
			//create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					const newInnovator = new Innovator({
						name,
						email,
						password: hash,
						profile_picture,
						mobileno,
						city,
						district,
						state,
						pincode,
						occupation,
					});
					newInnovator
						.save()
						.then((innovator) => {
							// console.log(user);
							jwt.sign(
								{ id: innovator._id, userType: "innovator" },
								process.env.JWT_KEY,
								{
									/*expiresIn: 3600*/
								},
								(err, token) => {
									if (err) {
										throw err;
									}
									return res.status(200).json({
										token: token,
										innovator: {
											id: innovator._id,
											name: innovator.name,
											email: innovator.email,
										},
									});
								}
							);
						})
						.catch((error) => {
							console.log(error);
							return res.status(500).json({ error: "Error adding the user." });
						});
				});
			});
		}
	});
};

// user login
module.exports.login = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all the fields." });
	}
	Innovator.findOne({ email: email }).then((innovator) => {
		if (!innovator) {
			return res.status(400).json({ message: "User does not exist." });
		}
		//password validation
		bcrypt.compare(password, innovator.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: innovator._id, userType: "innovator" },
				process.env.JWT_KEY,
				{
					/*expiresIn: 3600*/
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					return res.status(200).json({
						token: token,
						innovator: { id: innovator._id, name: innovator.name, email: innovator.email },
					}); //remove user later
				}
			);
		});
	});
};

module.exports.profile = (req, res) => {
	const innovatorId = req.innovator._id;

	Innovator.findById(innovatorId)
		.populate({
			path: "ideas",
			select: "-created_by",
		})
		.then((innovator) => {
			return res.status(201).json(innovator);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};
