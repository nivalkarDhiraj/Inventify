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
						.then((user) => {
							// console.log(user);
							jwt.sign(
								{ id: user._id },
								process.env.JWT_KEY,
								{
									/*expiresIn: 3600*/
								},
								(err, token) => {
									if (err) {
										throw err;
									}
									return res
										.status(200)
										.json({ token: token, user: { id: user._id, name: user.name, email: user.email } });
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
	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(400).json({ message: "User does not exist." });
		}
		//password validation
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: user._id },
				process.env.JWT_KEY,
				{
					/*expiresIn: 3600*/
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					return res
						.status(200)
						.json({ token: token, user: { id: user._id, name: user.name, email: user.email } }); //remove user later
				}
			);
		});
	});
};
