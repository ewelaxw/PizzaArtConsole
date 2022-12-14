import React from "react";
import { Newline, Text } from "ink";

const PizzaItem = ({ isSelected = false, label = "" }) => {
	return (
		<>
			<Text backgroundColor={isSelected ? "green" : undefined}>{label}</Text>
			<Newline />
		</>
	);
};

export default PizzaItem;
