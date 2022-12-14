import React, { useContext, useState } from "react";
import { RouterContext } from "../Providers/RoutesProvider/RoutersProvider";
import SelectInput, { Item } from "ink-select-input/build/SelectInput";
import Indicator from "../Components/Indicator/Indicator";
import PizzaItem from "../Components/PizzaItem/PizzaItem";
//import { convertToList } from "../Data/Pizzas";
import { Newline, Text, useInput } from "ink";
import axios from "axios";
import { Pizza } from "../Types/types";

const MainPage = () => {
	const { handleChangeRoute } = useContext(RouterContext);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);
	axios
		.get("http://localhost:8000/PizzaTypes")

		.then((response: any) => {
			const pizzas = response.data as Pizza[];

			if (pizzas) {
				setPizzas(pizzas);
			}
		})
		.catch(() => console.log("Błąd ładowania"));

	useInput((input, key) => {
		input;
		if (key.escape) {
			handleChangeRoute("/");
		}
	});

	const handleSelect = (item: Item<string>) => {
		if (item.value) {
			handleChangeRoute("/OrderView", item.value);
		}
	};

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

	const convertToList = (pizzas: Pizza[]) => {
		return pizzas.map((pizza) => {
			const { id, name, ingredients, isVege, spiciness } = pizza;
			return {
				label: `🍕 ${name} ${setSpicyLevel(spiciness)} (${setIngridients(
					ingredients
				)}) Wegetariańska: ${isVege ? "✔️" : "❌"}`,
				value: id,
			};
		});
	};

	return (
		<>
			<Text color={"green"}>Wybierz rodzaj pizzy:</Text>
			<SelectInput
				itemComponent={PizzaItem}
				items={convertToList(pizzas)}
				indicatorComponent={Indicator}
				onSelect={(item) => handleSelect(item)}
			/>
			<Newline />
			<Text color={"yellow"}>Wciśnij Esc aby anulować</Text>
		</>
	);
};

export default MainPage;
