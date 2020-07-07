import express, { Request, Response, Application } from "express";
import { dotenvTypes } from "./helpers/@types";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

console.log("dont forgot to start MONGOD");

mongoose
	.connect("mongodb://localhost/todo-list", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("mongo DB connected >>>>"))
	.then(require("dotenv").config)
	.then(start)
	.catch(() => () => console.log("Error while connecting to mongo DB"));

const app: Application = express();

// $ middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// $ middlewares

// ! routes********************

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ msg: "main index is empity" }).end();
});

app.use("/user", require("./routes/user"));
app.use("/todos", require("./routes/todos"));

app.get("*", (req: Request, res: Response) => {
	res.status(404).json({ msg: "not found" }).end();
});

// ! routes********************

var __SERVER__: any;
function start() {
	__SERVER__ = app
		.listen(process.env.PORT, () => {
			console.log(`listinning on PORT: ${process.env.PORT}`);
		})
		.on("error", shutDonw);
}
process.on("uncaughtException", shutDonw);
process.on("SIGTERM", shutDonw);
function shutDonw() {
	console.log("<<<<<<<<<server shutDown>>>>>>>>>");
	__SERVER__.close();
	try {
		process.exit(0 /* clean exit */);
	} catch (err) {
		process.exit(1 /* force exit */);
	}
}
export const dotenv: dotenvTypes = <any>process.env;
