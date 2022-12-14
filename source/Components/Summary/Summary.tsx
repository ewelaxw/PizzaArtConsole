import React, { useContext, useEffect, useState } from "react";
import { Box, Newline, Text } from "ink";
import { ListedItem } from "ink-multi-select/index";
import { AdditiveWithPrice, Ingredient, OrderSummary } from "../../Types/types";
//import { ingredients } from "../../Data/Ingredients";
import SelectInput, { Item } from "ink-select-input/build/SelectInput";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";
import { UserContext } from "../../Providers/UserProvider/UserProvider";
import axios from "axios";

type Props = { orderSummary: OrderSummary };
const Summary = (props: Props) => {
	const { orderSummary } = props;
	const [additivesWithPrices, setAdditivesWithPrices] = useState<
		AdditiveWithPrice[]
	>([]);

	const { handleChangeRoute } = useContext(RouterContext);
	const { user } = useContext(UserContext);

	useEffect(() => {
		axios
			.get("http://localhost:8000/Additives")
			.then((response: any) => {
				const ingredients = response.data as Ingredient[];
				//setIngredients(ingredients);
				convertAdditives(orderSummary.additives, ingredients);
			})
			.catch(() => console.log("Nie udało się zalogować"));
	}, []);

	/*useEffect(() => {
		
	}, []);*/
	const renderAdditives = () => {
		return additivesWithPrices.map((additive) => {
			return (
				<Text
					key={additive.name}
				>{`${additive.name} ${additive.price} zł`}</Text>
			);
		});
	};

	const convertAdditives = (
		additives: ListedItem[],
		ingredients: Ingredient[]
	) => {
		const additivesWithPrices = additives.map((additive) => {
			const [item] = ingredients.filter((ingredient) => {
				return ingredient.name === additive.label;
			});
			return {
				name: item?.name,
				price: item?.price,
			} as AdditiveWithPrice;
		});
		setAdditivesWithPrices(additivesWithPrices);
	};

	const getSummary = () => {
		let sum = 0;
		additivesWithPrices.forEach((additive) => {
			sum += additive.price;
		});
		sum += orderSummary.price;
		return sum;
	};

	const options = [
		{
			label: "Zaakceptuj",
			value: "Accept",
		},
		{
			label: "Cofnij",
			value: "Back",
		},
	];
	const handleSelect = (item: Item<string>) => {
		if (item.value === "Accept") {
			handleChangeRoute("/Realization");
		} else {
			handleChangeRoute("/Main");
		}
	};

	return (
		<Box flexDirection={"column"}>
			<Text color="green">Podsumowanie:</Text>
			<Text>{`Pizza: ${orderSummary.name} Rozmiar: ${orderSummary.size} Cena: ${orderSummary.price} zł`}</Text>
			<Newline />
			<Text color="green">Dodatki:</Text>
			{renderAdditives()}
			<Newline />
			<Text>____________</Text>
			<Text>{`Cena: ${getSummary()} zł`}</Text>
			<Newline />
			<Text color="green">Adres dostawy: </Text>
			<Text>{`Miasto: ${user?.city}`}</Text>
			<Text>{`Ulica i nr: ${user?.street}`}</Text>
			<Newline />
			<Text color="green">Wybierz opcje:</Text>
			<SelectInput items={options} onSelect={(item) => handleSelect(item)} />
		</Box>
	);
};

export default Summary;
