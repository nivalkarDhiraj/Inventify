const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ideaSchema = new mongoose.Schema({
	title: {
		type: "string",
		required: true,
	},
	category: {
		type: "string",
		required: true,
	},
	description: {
		type: "string",
		required: true,
	},
	innovative: {
		type: "string",
		required: true,
	},
	competitors: [
		{
			type: "string",
			required: true,
		},
	],
	completedAny: {
		type: "string",
		required: true,
	},
	possessionAny: [{
		type: "string",
		required: true,
	}],
	image: [
		{
			type: "string",
			required: true,
		},
	],
	patent: {
		type: "Boolean",
		required: true,
	},

	interested_ideas: [
		{
			type: ObjectId,
			ref: "Idea",
		},
	],
});

module.exports = mongoose.model("Idea", ideaSchema);
