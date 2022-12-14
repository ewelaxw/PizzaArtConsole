import React, { useContext } from "react";
//@ts-ignore
import figlet from "figlet";
import { Box, Newline, Text } from "ink";
import SelectInput, { Item } from "ink-select-input/build/SelectInput";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";

const HeroPage = () => {
	const { handleChangeRoute } = useContext(RouterContext);
	const option = [
		{
			label: "Logowanie",
			value: "Login",
		},
		{
			label: "Rejestracja",
			value: "Register",
		},
	];

	const handleUserSelect = (item: Item<string>) => {
		if (item.value === "Login") {
			handleChangeRoute("/Login");
		} else {
			handleChangeRoute("/Register");
		}
	};
	return (
		<Box flexDirection="column" alignItems="center">
			<Text color={"green"}>{figlet.textSync("Pizza-art")}</Text>
			<Newline />
			<SelectInput
				items={option}
				initialIndex={0}
				onSelect={handleUserSelect}
			/>
		</Box>
	);
};

export default HeroPage;
