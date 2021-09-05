const mongoose = require("mongoose");

const mongodbURI = `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.upyxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, {
	useNewUrlParser: true
});

mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
	console.log("Database Connected...");
});

mongoose.connection.on("error", (error) => {
	console.log("Error connecting database..."), error;
});