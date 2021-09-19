const Investor = require("../models/investor");
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
		business,
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
		!business
	) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
	Investor.findOne({ email: email }).then((investor) => {
		if (investor) {
			return res.status(400).json({ message: "User already exist" });
		} else {
			//create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					const newInvestor = new Investor({
						name,
						email,
						password: hash,
						profile_picture,
						mobileno,
						city,
						district,
						state,
						pincode,
						business,
					});
					newInvestor
						.save()
						.then((investor) => {
							// console.log(user);
							jwt.sign(
								{ id: investor._id },
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
										.json({ token: token, investor: { id: investor._id, name: investor.name, email: investor.email } });
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
	Investor.findOne({ email: email }).then((investor) => {
		if (!investor) {
			return res.status(400).json({ message: "User does not exist." });
		}
		//password validation
		bcrypt.compare(password, investor.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(400).json({ message: "Invalid email or password." });
			}
			jwt.sign(
				{ id: investor._id },
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
						.json({ token: token, investor: { id: investor._id, name: investor.name, email: investor.email } }); 
				}
			);
		});
	});
};

module.exports.profile = (req, res) => {
	const investorId = req.investor._id; 

	console.log(investorId);

	Investor.findById(investorId).populate({ 
		path : "invested_ideas interested_ideas",
		select : "-created_by"
	}).then((investor) => {
		return res.status(201).json(investor);
	})
	.catch((error) => {
		return res.status(500).json({ message: error.message });
	});
}