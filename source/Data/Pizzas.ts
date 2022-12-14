//import { Pizza, types } from "../Types/types";
//import { ingredients } from "./Ingredients";
/*
export const convertToList = (pizzas: Pizza[]) => {
	return pizzas.map((pizza) => {
		const { id, name, ingredients, isVege, spiciness  } = pizza;
		return {
			label: `🍕 ${name} ${setSpicyLevel(spiciness)} (${setIngridients(
				ingredients
			)}) Wegetariańska: ${isVege ? "✔️" : "❌"}`,
			value: id,
		};
	});
};
const { cheese, chilli, tomatoSauce, olives, garlic, salami, oregano } = types;
export const pizzas: Pizza[] = [
	{
		id: "p1",
		name: "Margherita",
		ingredients: [tomatoSauce, cheese, oregano],
		isVege: true,
		spiciness: 0,
		prices: {
			small: 17,
			large: 25,
		},
	},
	{
		id: "p2",
		name: "Pepperoni",
		ingredients: [tomatoSauce, cheese, salami, oregano],
		isVege: false,
		spiciness: 0,
		prices: {
			small: 21,
			large: 30,
		},
	},
	{
		id: "p3",
		name: "Mafioso",
		ingredients: [tomatoSauce, chilli, garlic, cheese, salami, oregano],
		isVege: false,
		spiciness: 3,
		prices: {
			small: 22,
			large: 33,
		},
	},

	{
		id: "p4",
		name: "Napoletana",
		ingredients: [tomatoSauce, chilli, cheese, salami, oregano, olives],
		isVege: false,
		spiciness: 1,
		prices: {
			small: 22,
			large: 34,
		},
	},
];

const setSpicyLevel = (level: number) => {
	let spiciness = "";
	if (!level) {
		return "🌶 ";
	}
	for (let i = 0; i < level; i++) {
		spiciness += "🌶️ ";
	}
	return spiciness;
};

const setIngridients = (ingredients: string[]) => {
	let ingredientsList = "";
	ingredients.forEach((ingredient) => {
		ingredientsList += ` ${ingredient}`;
	});
	return ingredientsList;
};
*/
