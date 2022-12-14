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
const ink_1 = require("ink");
//import { ingredients } from "../../Data/Ingredients";
const SelectInput_1 = __importDefault(require("ink-select-input/build/SelectInput"));
const RoutersProvider_1 = require("../../Providers/RoutesProvider/RoutersProvider");
const UserProvider_1 = require("../../Providers/UserProvider/UserProvider");
const axios_1 = __importDefault(require("axios"));
const Summary = (props) => {
    const { orderSummary } = props;
    const [additivesWithPrices, setAdditivesWithPrices] = (0, react_1.useState)([]);
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const { user } = (0, react_1.useContext)(UserProvider_1.UserContext);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:8000/Additives")
            .then((response) => {
            const ingredients = response.data;
            //setIngredients(ingredients);
            convertAdditives(orderSummary.additives, ingredients);
        })
            .catch(() => console.log("Nie udało się zalogować"));
    }, []);
    /*useEffect(() => {
        
    }, []);*/
    const renderAdditives = () => {
        return additivesWithPrices.map((additive) => {
            return (react_1.default.createElement(ink_1.Text, { key: additive.name }, `${additive.name} ${additive.price} zł`));
        });
    };
    const convertAdditives = (additives, ingredients) => {
        const additivesWithPrices = additives.map((additive) => {
            const [item] = ingredients.filter((ingredient) => {
                return ingredient.name === additive.label;
            });
            return {
                name: item?.name,
                price: item?.price,
            };
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
    const handleSelect = (item) => {
        if (item.value === "Accept") {
            handleChangeRoute("/Realization");
        }
        else {
            handleChangeRoute("/Main");
        }
    };
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Podsumowanie:"),
        react_1.default.createElement(ink_1.Text, null, `Pizza: ${orderSummary.name} Rozmiar: ${orderSummary.size} Cena: ${orderSummary.price} zł`),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Dodatki:"),
        renderAdditives(),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Text, null, "____________"),
        react_1.default.createElement(ink_1.Text, null, `Cena: ${getSummary()} zł`),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Adres dostawy: "),
        react_1.default.createElement(ink_1.Text, null, `Miasto: ${user?.city}`),
        react_1.default.createElement(ink_1.Text, null, `Ulica i nr: ${user?.street}`),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Wybierz opcje:"),
        react_1.default.createElement(SelectInput_1.default, { items: options, onSelect: (item) => handleSelect(item) })));
};
exports.default = Summary;
