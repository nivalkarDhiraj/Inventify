const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const investorSchema = new mongoose.Schema({
	name: {
		type: "String",
		required: true,
	},
	email: {
		type: "String",
		required: true,
		unique: true,
		match:
			/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	},
	password: {
		type: "String",
		required: true,
	},
	profile_picture: {
		type: "String",
		default:
			"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
	},
	mobileno: {
		type: "String",
		required: true,
	},
	city: {
		type: "String",
		required: true,
	},
	district: {
		type: "String",
		required: true,
	},
	state: {
		type: "String",
		required: true,
	},
	pincode: {
		type: "String",
		required: true,
	},
	business: {
		type: "String",
		required: true,
	},
	invested_ideas: [
		{
			type: ObjectId,
			ref: "Idea",
		},
	],
	interested_ideas: [
		{
			type: ObjectId,
			ref: "Idea",
		},
	],
});

module.exports = mongoose.model("Investor", investorSchema);
