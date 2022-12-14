import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { dataStorage } from "./Data/DataStorage";
import cors from "cors";
import { pizzas, sizes } from "./Data/Pizzas";
import { ingredients } from "./Data/Ingredients";

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/Register", (req, res) => {
	const user = dataStorage.addUser({
		name: req.body.name,
		password: req.body.password,
		city: req.body.city,
		street: req.body.streetAndNumber,
	});

	if (user) {
		res.json(user);

		return;
	}
	res.sendStatus(400);
});

app.post("/Register", (req, res) => {
	const user = dataStorage.addUser({
		name: req.body.name,
		password: req.body.password,
		city: req.body.city,
		street: req.body.streetAndNumber,
	});

	if (user) {
		res.json(user);

		return;
	}
	res.sendStatus(400);
});

app.post("/Login", (req, res) => {
	const user = dataStorage.loginUser({
		name: req.body.name,
		password: req.body.password,
	});

	if (user) {
		res.json(user);
		return;
	}
	res.sendStatus(400);
});

app.get("/PizzaTypes", (req, res) => {
	res.json(pizzas);
});

app.get("/Additives", (req, res) => {
	res.json(ingredients);
});

app.get("/Sizes", (req, res) => {
	res.json(sizes);
});

app.listen(8000, () => {});
