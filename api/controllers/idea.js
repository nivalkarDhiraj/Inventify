const Idea = require("../models/idea");

module.exports.postIdea1 = (req, res) => {
	const { title, category, description, innovative, competitors, completedAny, possessionAny } =
		req.body;

	if (
		!title ||
		!category ||
		!description ||
		!innovative ||
		!competitors ||
		!completedAny ||
		!possessionAny
	) {
		return res.status(400).json({ message: "please enter all fieds" });
	}

	const newIdea = new Idea({
		title,
		category,
		description,
		innovative,
		competitors,
		completedAny,
		possessionAny,
		created_by: req.innovator._id,
	});

	newIdea
		.save()
		.then((idea) => {
			return res.status(200).json({
				idea,
			});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({ error: "Error adding the idea." });
		});
};

module.exports.postIdea2 = (req, res) => {
	const { image, ideaId } = req.body;
	if (!image || !ideaId) {
		return res.status(400).json({ message: "please enter all fieds" });
	}
	Idea.findByIdAndUpdate(ideaId, {
		$push: { image: image },
	})
		.then((idea) => {
			return res.status(201).json({ message: "Image post successful" });
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.postIdea3 = (req, res) => {
	const {
		patent,
		pendingPatent,
		comeUpWithInvention,
		disclosedToPublic,
		explainedInPublic,
		rememberDateOfInvention,
		websiteForInvention,
		anyoneElseContributed,
		anyoneKnowAboutInvention,
		ideaId
	} = req.body;

	if (!ideaId) {
		return res.status(400).json({ message: "please enter ideaId" });
	}

	Idea.findByIdAndUpdate(ideaId, {
		patent,
		pendingPatent,
		comeUpWithInvention,
		disclosedToPublic,
		explainedInPublic,
		rememberDateOfInvention,
		websiteForInvention,
		anyoneElseContributed,
		anyoneKnowAboutInvention,
	})
		.then(() => {
			return res.status(201).json({ message: "Part3 successful" });
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getAll = (req, res) => {
	Idea.find().populate({ 
		path : "created_by"
	}).then((ideas) => {
		return res.status(201).json({ ideas });
	})
	.catch((error) => {
		return res.status(500).json({ message: error.message });
	});
}