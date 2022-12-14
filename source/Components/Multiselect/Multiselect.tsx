import { Box, Text, useInput } from "ink";
import React, { useEffect, useState } from "react";

export type Item = {
	label: string;
	value: string;
	isSelected: boolean;
};

export type SelectedItem = {
	label: string;
	value: string;
};

type Props = {
	items: Item[];
	onSubmit: Function;
};

const Multiselect = (props: Props) => {
	const { items, onSubmit } = props;
	const [itemsList, setItemsList] = useState<Item[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const getSelectedItems = (items: Item[]) => {
		return items
			.filter((item) => {
				return item.isSelected;
			})
			.map((selected) => {
				return {
					label: selected.label,
					value: selected.value,
				} as SelectedItem;
			});
	};
	const submit = (callback: Function) => {
		callback(getSelectedItems(items));
	};

	useInput((input, key) => {
		if (key.downArrow) {
			if (selectedIndex === 0 || selectedIndex < items.length - 1) {
				setSelectedIndex(selectedIndex + 1);
			}
		}

		if (key.upArrow) {
			if (selectedIndex > 0) {
				setSelectedIndex(selectedIndex - 1);
			}
		}

		if (input === " ") {
			const newList = [...itemsList];
			if (newList.length) {
				newList[selectedIndex]!.isSelected =
					!newList[selectedIndex]!.isSelected;
				setItemsList(newList);
			}
		}

		if (key.return) {
			submit(onSubmit);
		}
	});
	useEffect(() => {
		setItemsList([...items]);
	}, [items]);

	const renderList = (itemsList: Item[]) => {
		return itemsList.map((item, index) => {
			return (
				<Box flexDirection={"row"} key={index}>
					{item.isSelected ? (
						<Text color={"yellow"}>{`( * ) `}</Text>
					) : (
						<Text color={"green"}>{`(   ) `}</Text>
					)}
					<Text color={index === selectedIndex ? "yellow" : "blue"}>
						{item.label}
					</Text>
				</Box>
			);
		});
	};

	return <>{renderList(itemsList)}</>;
};

export default Multiselect;
