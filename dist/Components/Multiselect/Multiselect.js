"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const react_1 = __importStar(require("react"));
const Multiselect = (props) => {
    const { items, onSubmit } = props;
    const [itemsList, setItemsList] = (0, react_1.useState)([]);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const getSelectedItems = (items) => {
        return items
            .filter((item) => {
            return item.isSelected;
        })
            .map((selected) => {
            return {
                label: selected.label,
                value: selected.value,
            };
        });
    };
    const submit = (callback) => {
        callback(getSelectedItems(items));
    };
    (0, ink_1.useInput)((input, key) => {
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
                newList[selectedIndex].isSelected =
                    !newList[selectedIndex].isSelected;
                setItemsList(newList);
            }
        }
        if (key.return) {
            submit(onSubmit);
        }
    });
    (0, react_1.useEffect)(() => {
        setItemsList([...items]);
    }, [items]);
    const renderList = (itemsList) => {
        return itemsList.map((item, index) => {
            return (react_1.default.createElement(ink_1.Box, { flexDirection: "row", key: index },
                item.isSelected ? (react_1.default.createElement(ink_1.Text, { color: "yellow" }, `( * ) `)) : (react_1.default.createElement(ink_1.Text, { color: "green" }, `(   ) `)),
                react_1.default.createElement(ink_1.Text, { color: index === selectedIndex ? "yellow" : "blue" }, item.label)));
        });
    };
    return react_1.default.createElement(react_1.default.Fragment, null, renderList(itemsList));
};
exports.default = Multiselect;
