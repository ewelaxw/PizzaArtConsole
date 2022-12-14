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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const RoutersProvider_1 = require("../Providers/RoutesProvider/RoutersProvider");
const SelectInput_1 = __importDefault(require("ink-select-input/build/SelectInput"));
const Indicator_1 = __importDefault(require("../Components/Indicator/Indicator"));
const PizzaItem_1 = __importDefault(require("../Components/PizzaItem/PizzaItem"));
//import { convertToList } from "../Data/Pizzas";
const ink_1 = require("ink");
const axios_1 = __importDefault(require("axios"));
const MainPage = () => {
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const [pizzas, setPizzas] = (0, react_1.useState)([]);
    axios_1.default
        .get("http://localhost:8000/PizzaTypes")
        .then((response) => {
        const pizzas = response.data;
        if (pizzas) {
            setPizzas(pizzas);
        }
    })
        .catch(() => console.log("Błąd ładowania"));
    (0, ink_1.useInput)((input, key) => {
        input;
        if (key.escape) {
            handleChangeRoute("/");
        }
    });
    const handleSelect = (item) => {
        if (item.value) {
            handleChangeRoute("/OrderView", item.value);
        }
    };
    const setSpicyLevel = (level) => {
        let spiciness = "";
        if (!level) {
            return "🌶 ";
        }
        for (let i = 0; i < level; i++) {
            spiciness += "🌶️ ";
        }
        return spiciness;
    };
    const setIngridients = (ingredients) => {
        let ingredientsList = "";
        ingredients.forEach((ingredient) => {
            ingredientsList += ` ${ingredient}`;
        });
        return ingredientsList;
    };
    const convertToList = (pizzas) => {
        return pizzas.map((pizza) => {
            const { id, name, ingredients, isVege, spiciness } = pizza;
            return {
                label: `🍕 ${name} ${setSpicyLevel(spiciness)} (${setIngridients(ingredients)}) Wegetariańska: ${isVege ? "✔️" : "❌"}`,
                value: id,
            };
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Wybierz rodzaj pizzy:"),
        react_1.default.createElement(SelectInput_1.default, { itemComponent: PizzaItem_1.default, items: convertToList(pizzas), indicatorComponent: Indicator_1.default, onSelect: (item) => handleSelect(item) }),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Text, { color: "yellow" }, "Wci\u015Bnij Esc aby anulowa\u0107")));
};
exports.default = MainPage;
