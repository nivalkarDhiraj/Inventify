const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ideaSchema = new mongoose.Schema(
	{
		title: {
			type: "String",
			required: true,
		},
		category: [
			{
				type: "String",
				required: true,
			},
		],
		description: {
			type: "String",
			required: true,
		},
		innovative: {
			type: "String",
			required: true,
		},
		competitors: {
			type: "String",
		},
		completedAny: [
			{
				type: "String",
				required: true,
			},
		],
		possessionAny: [
			{
				type: "String",
			},
		],
		image: [
			{
				type: "String",
			},
		],
		patent: {
			type: "Boolean",
			default: false,
		},
		pendingPatent: {
			type: "Boolean",
			default: false,
		},
		comeUpWithInvention: {
			type: "Boolean",
			default: false,
		},
		disclosedToPublic: {
			type: "Boolean",
			default: false,
		},
		explainedInPublic: {
			type: "Boolean",
			default: false,
		},
		rememberDateOfInvention: {
			type: "Boolean",
			default: false,
		},
		websiteForInvention: {
			type: "Boolean",
			default: false,
		},
		anyoneElseContributed: {
			type: "Boolean",
			default: false,
		},
		anyoneKnowAboutInvention: {
			type: "Boolean",
			default: false,
		},
		created_by: 
			{
				type: ObjectId,
				ref: "Innovator",
			},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Idea", ideaSchema);
