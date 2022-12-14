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
const SelectInput_1 = __importDefault(require("ink-select-input/build/SelectInput"));
//import { ingredients } from "../../Data/Ingredients";
//import { pizzas } from "../../Data/Pizzas";
const Summary_1 = __importDefault(require("../../Components/Summary/Summary"));
const ink_1 = require("ink");
const Multiselect_1 = __importDefault(require("../../Components/Multiselect/Multiselect"));
const RoutersProvider_1 = require("../../Providers/RoutesProvider/RoutersProvider");
const axios_1 = __importDefault(require("axios"));
const OrderView = (props) => {
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const [ingredients, setIngredients] = (0, react_1.useState)([]);
    const [pizzas, setPizzas] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:8000/Additives")
            .then((response) => {
            const ingredients = response.data;
            setIngredients(ingredients);
            //setAdditives(convertToIngredientsAdditivesList(ingredients))
        })
            .catch(() => console.log("Nie udało się zalogować"));
    }, []);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:8000/PizzaTypes")
            .then((response) => {
            const pizzas = response.data;
            if (pizzas) {
                setPizzas(pizzas);
            }
        })
            .catch(() => console.log("Błąd ładowania"));
    }, []);
    (0, ink_1.useInput)((input, key) => {
        input;
        if (key.escape) {
            handleChangeRoute("/Main");
        }
    });
    const { id } = props;
    const [step, setStep] = (0, react_1.useState)(1);
    const [summary, setSummary] = (0, react_1.useState)({
        additives: [],
        size: "",
        name: "",
        price: 0,
    });
    const getPizzaById = (id, pizzas) => {
        return pizzas.filter((pizza) => {
            return pizza.id === id;
        });
    };
    const convertToIngredientsAdditivesList = (ingredients) => {
        return ingredients.map((ingredient) => {
            return {
                label: ingredient.name,
                value: ingredient.id,
                isSelected: false,
            };
        });
    };
    const handleFirstStepSubmit = (items) => {
        setSummary({ ...summary, additives: items });
        setStep(step + 1);
    };
    const handleSecondStepSubmit = (items) => {
        const pizza = getPizzaById(id, pizzas);
        const price = items.value === "Large" ? pizza[0]?.prices.large : pizza[0]?.prices.small;
        setSummary({
            ...summary,
            size: items.value.toString(),
            name: pizza[0]?.name,
            price: price,
        });
        setStep(step + 1);
    };
    const handleFirstStep = () => {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, { color: "green" }, "Wybierz dodatki"),
            react_1.default.createElement(Multiselect_1.default, { items: convertToIngredientsAdditivesList(ingredients), onSubmit: (item) => handleFirstStepSubmit(item) })));
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
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ink_1.Text, { color: "green" }, "Rozmiar pizzy:"),
            react_1.default.createElement(SelectInput_1.default, { items: sizes, initialIndex: 0, onSelect: handleSecondStepSubmit })));
    };
    const handleFinalStep = () => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Summary_1.default, { orderSummary: summary })));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        step === 1 && handleFirstStep(),
        step === 2 && handleSecondStep(),
        step === 3 && handleFinalStep(),
        step !== 3 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ink_1.Newline, null),
            react_1.default.createElement(ink_1.Text, { color: "yellow" }, "Wci\u015Bnij Esc aby anulowa\u0107"))) : null));
};
exports.default = OrderView;
