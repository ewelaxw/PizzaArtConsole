import React from "react";
import { Box, Text } from "ink";

const Indicator = ({ isSelected = false }) => (
	<Box marginRight={1}>
		{isSelected ? <Text color="green">▶</Text> : <Text></Text>}
	</Box>
);

export default Indicator;

//🍕
//🌶️
//🍅
//👛
//💰
//💵
//🌶
