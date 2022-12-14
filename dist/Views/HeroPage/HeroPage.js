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
//@ts-ignore
const figlet_1 = __importDefault(require("figlet"));
const ink_1 = require("ink");
const SelectInput_1 = __importDefault(require("ink-select-input/build/SelectInput"));
const RoutersProvider_1 = require("../../Providers/RoutesProvider/RoutersProvider");
const HeroPage = () => {
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
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
    const handleUserSelect = (item) => {
        if (item.value === "Login") {
            handleChangeRoute("/Login");
        }
        else {
            handleChangeRoute("/Register");
        }
    };
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column", alignItems: "center" },
        react_1.default.createElement(ink_1.Text, { color: "green" }, figlet_1.default.textSync("Pizza-art")),
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(SelectInput_1.default, { items: option, initialIndex: 0, onSelect: handleUserSelect })));
};
exports.default = HeroPage;
