const express = require("express");
require("dotenv").config();
require("./db");
const morgan = require("morgan"); //logger
const cors = require("cors");
const userRouter = require("./api/routes/innovator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/innovator", userRouter);
app.get("/", (req, res) => res.send("Hello World!!!"));

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
