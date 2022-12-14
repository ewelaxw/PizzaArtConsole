import { ListedItem } from "ink-multi-select/index";

export type Routes =
	| "/"
	| "/Login"
	| "/Register"
	| "/Main"
	| "/OrderView"
	| "/Summary"
	| "/Realization";

export type Route = {
	currentRoute: Routes;
	id?: string;
	payload?: object;
};
export type Pizza = {
	id: string;
	name: string;
	ingredients: string[];
	spiciness: number;
	isVege: boolean;
	prices: {
		small: number;
		large: number;
	};
};

export type Ingredient = {
	id: string;
	name: string;
	price: number;
};

export const types = {
	cheese: "Cheese",
	chilli: "Chilli",
	tomatoSauce: "TomatoSauce",
	olives: "Olives",
	salami: "Salami",
	garlic: "Garlic",
	oregano: "Oregano",
};

export type Item = {
	label: string;
	value: string;
};

export type OrderSummary = {
	additives: ListedItem[];
	size: string;
	name: string;
	price: number;
};

export type AdditiveWithPrice = {
	name: string;
	price: number;
};
