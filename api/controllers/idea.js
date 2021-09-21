const Idea = require("../models/idea");
const Innovator = require("../models/innovator");
const Investor = require("../models/investor");

module.exports.postIdea1 = (req, res) => {
	const { title, category, description, innovative, competitors, completedAny, possessionAny } =
		req.body;

	const innovatorId = req.innovator._id;

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
			Innovator.findByIdAndUpdate(innovatorId, {
				$push: { ideas: idea._id },
			})
				.then(() => {
					return res.status(200).json({
						idea,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(500).json({ error: "Error adding the idea." });
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
		ideaId,
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
	Idea.find()
		.populate({
			path: "created_by",
			select: "-password",
		})
		.then((ideas) => {
			return res.status(201).json(ideas);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getAllWithTags = (req, res) => {
	const {category} = req.query;
	Idea.find({category})
		.populate({
			path: "created_by",
			select: "-password",
		})
		.then((ideas) => {
			return res.status(201).json(ideas);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.getOne = (req, res) => {
	const { ideaId } = req.params;

	Idea.findById(ideaId)
		.populate({
			path: "created_by",
			select: "-password",
		})
		.then((idea) => {
			return res.status(201).json(idea);
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.interested = (req, res) => {
	const { ideaId } = req.params;
	const investorId = req.investor._id;

	Idea.findById(ideaId)
		.then(async () => {
			let isAlreadyInterested = false;
			await Investor.findById(investorId).then((investor) => {
				isAlreadyInterested = investor.interested_ideas.includes(ideaId);
			});

			if (isAlreadyInterested) {
				return res.status(400).json({ message: "You already have this idea in interested list" });
			} else {
				Investor.findByIdAndUpdate(investorId, {
					$push: { interested_ideas: ideaId },
				})
					.then(() => {
						return res
							.status(201)
							.json({ message: "Idea has been added to your interested ideas list" });
					})
					.catch((error) => {
						return res.status(500).json({ message: error.message });
					});
			}
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};

module.exports.invest = (req, res) => {
	const { ideaId } = req.params;
	const investorId = req.investor._id;

	Idea.findById(ideaId)
		.then(async () => {
			let isAlreadyInvested = false;
			await Investor.findById(investorId).then((investor) => {
				isAlreadyInvested = investor.invested_ideas.includes(ideaId);
			});

			if (isAlreadyInvested) {
				return res.status(400).json({ message: "You already have this idea in invested list" });
			} else {
				Investor.findByIdAndUpdate(investorId, {
					$push: { invested_ideas: ideaId },
				})
					.then(() => {
						return res
							.status(201)
							.json({ message: "Idea has been added to your invested ideas list" });
					})
					.catch((error) => {
						return res.status(500).json({ message: error.message });
					});
			}
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
};
