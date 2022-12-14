import React, { useContext, useEffect, useState } from "react";
import { Ingredient, OrderSummary, Pizza } from "../../Types/types";
import SelectInput, { Item } from "ink-select-input/build/SelectInput";
//import { ingredients } from "../../Data/Ingredients";
//import { pizzas } from "../../Data/Pizzas";
import Summary from "../../Components/Summary/Summary";
import { Box, Newline, Text, useInput } from "ink";
import Multiselect, {
	SelectedItem,
} from "../../Components/Multiselect/Multiselect";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";
import axios from "axios";

type Props = { id: string };

const OrderView = (props: Props) => {
	const { handleChangeRoute } = useContext(RouterContext);
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/Additives")
			.then((response: any) => {
				const ingredients = response.data as Ingredient[];
				setIngredients(ingredients);
				//setAdditives(convertToIngredientsAdditivesList(ingredients))
			})
			.catch(() => console.log("Nie udało się zalogować"));
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8000/PizzaTypes")

			.then((response: any) => {
				const pizzas = response.data as Pizza[];

				if (pizzas) {
					setPizzas(pizzas);
				}
			})
			.catch(() => console.log("Błąd ładowania"));
	}, []);

	useInput((input, key) => {
		input;
		if (key.escape) {
			handleChangeRoute("/Main");
		}
	});
	const { id } = props;

	const [step, setStep] = useState(1);

	const [summary, setSummary] = useState<OrderSummary>({
		additives: [],
		size: "",
		name: "",
		price: 0,
	});

	const getPizzaById = (id: string, pizzas: Pizza[]) => {
		return pizzas.filter((pizza) => {
			return pizza.id === id;
		});
	};

	const convertToIngredientsAdditivesList = (ingredients: Ingredient[]) => {
		return ingredients.map((ingredient) => {
			return {
				label: ingredient.name,
				value: ingredient.id,
				isSelected: false,
			};
		});
	};

	const handleFirstStepSubmit = (items: SelectedItem[]) => {
		setSummary({ ...summary, additives: items });
		setStep(step + 1);
	};

	const handleSecondStepSubmit = (items: Item<string>) => {
		const pizza = getPizzaById(id, pizzas);
		const price =
			items.value === "Large" ? pizza[0]?.prices.large : pizza[0]?.prices.small;

		setSummary({
			...summary,
			size: items.value.toString(),
			name: pizza[0]?.name!,
			price: price!,
		});
		setStep(step + 1);
	};

	const handleFirstStep = () => {
		return (
			<Box flexDirection="column">
				<Text color="green">Wybierz dodatki</Text>
				<Multiselect
					items={convertToIngredientsAdditivesList(ingredients)}
					onSubmit={(item: any) => handleFirstStepSubmit(item)}
				/>
			</Box>
		);
	};

	const handleSecondStep = () => {
		const sizes = [
			{
				label: "Mała pizza",
				value: "Small",
			},
			{
				label: "Duża pizza",
				value: "Large",
			},
		];

		return (
			<>
				<Text color="green">Rozmiar pizzy:</Text>
				<SelectInput
					items={sizes}
					initialIndex={0}
					onSelect={handleSecondStepSubmit}
				/>
			</>
		);
	};

	const handleFinalStep = () => {
		return (
			<>
				<Summary orderSummary={summary} />
			</>
		);
	};

	return (
		<>
			{step === 1 && handleFirstStep()}
			{step === 2 && handleSecondStep()}
			{step === 3 && handleFinalStep()}
			{step !== 3 ? (
				<>
					<Newline />
					<Text color={"yellow"}>Wciśnij Esc aby anulować</Text>
				</>
			) : null}
		</>
	);
};

export default OrderView;
