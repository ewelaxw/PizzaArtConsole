import React, { useContext, useEffect, useState } from "react";
//@ts-ignore
import ProgressBar from "ink-progress-bar";
import { Box, Newline, Text } from "ink";
//@ts-ignore
import figlet from "figlet";
import SelectInput, { Item } from "ink-select-input/build/SelectInput";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";

const RealizationView = () => {
	const [phase, setPhase] = useState("Wyrabiamy ciasto");
	const [percent, setPercent] = useState(0);

	const { handleChangeRoute } = useContext(RouterContext);

	const goForward = (percent: number) => {
		const interval = setInterval(() => {
			setPercent((percent) => percent + 0.05);
		}, 500);

		if (percent > 1) {
			clearInterval(interval);
		}

		return interval;
	};

	useEffect(() => {
		if (percent >= 0.9) {
			setPhase("Wysyłamy");
		} else if (percent >= 0.7) {
			setPhase("Kroimy i pakujemy");
		} else if (percent >= 0.5) {
			setPhase("Pieczemy Twoją pizzę");
		} else if (percent >= 0.3) {
			setPhase("Nakładamy składniki");
		}
	}, [percent]);

	useEffect(() => {
		const interval = goForward(percent);
		return () => clearInterval(interval);
	}, []);

	const options = [
		{
			label: "Nowe zamówienie",
			value: "New",
		},
		{
			label: "Wyjdź",
			value: "Back",
		},
	];
	const handleSelect = (item: Item<string>) => {
		if (item.value === "New") {
			handleChangeRoute("/Main");
		} else {
			handleChangeRoute("/");
		}
	};

	return (
		<Box flexDirection="column" alignItems="center">
			{percent < 1 ? (
				<Text color={"green"}>{figlet.textSync("Przygotowanie...")}</Text>
			) : (
				<Text color={"green"}>{figlet.textSync("Smacznego!!")}</Text>
			)}
			<Newline />
			{percent < 1 ? (
				<Box
					flexDirection="column"
					//alignItems={"flex-start"}
					alignSelf={"center"}
					width="200"
				>
					<Text color={"blue"}>{phase}</Text>
					<Newline />
					<Text color={"green"}>
						<ProgressBar left={100} percent={percent} />
					</Text>
				</Box>
			) : null}
			<Newline />
			<Box alignSelf={"flex-start"} flexDirection={"column"}>
				<Text color={"yellow"}>Wybierz opcje:</Text>
				<SelectInput items={options} onSelect={(item) => handleSelect(item)} />
			</Box>
		</Box>
	);
};

export default RealizationView;
