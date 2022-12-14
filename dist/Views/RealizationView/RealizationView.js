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
const ink_progress_bar_1 = __importDefault(require("ink-progress-bar"));
const ink_1 = require("ink");
//@ts-ignore
const figlet_1 = __importDefault(require("figlet"));
const SelectInput_1 = __importDefault(require("ink-select-input/build/SelectInput"));
const RoutersProvider_1 = require("../../Providers/RoutesProvider/RoutersProvider");
const RealizationView = () => {
    const [phase, setPhase] = (0, react_1.useState)("Wyrabiamy ciasto");
    const [percent, setPercent] = (0, react_1.useState)(0);
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const goForward = (percent) => {
        const interval = setInterval(() => {
            setPercent((percent) => percent + 0.05);
        }, 500);
        if (percent > 1) {
            clearInterval(interval);
        }
        return interval;
    };
    (0, react_1.useEffect)(() => {
        if (percent >= 0.9) {
            setPhase("Wysyłamy");
        }
        else if (percent >= 0.7) {
            setPhase("Kroimy i pakujemy");
        }
        else if (percent >= 0.5) {
            setPhase("Pieczemy Twoją pizzę");
        }
        else if (percent >= 0.3) {
            setPhase("Nakładamy składniki");
        }
    }, [percent]);
    (0, react_1.useEffect)(() => {
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
    const handleSelect = (item) => {
        if (item.value === "New") {
            handleChangeRoute("/Main");
        }
        else {
            handleChangeRoute("/");
        }
    };
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column", alignItems: "center" },
        percent < 1 ? (react_1.default.createElement(ink_1.Text, { color: "green" }, figlet_1.default.textSync("Przygotowanie..."))) : (react_1.default.createElement(ink_1.Text, { color: "green" }, figlet_1.default.textSync("Smacznego!!"))),
        react_1.default.createElement(ink_1.Newline, null),
        percent < 1 ? (react_1.default.createElement(ink_1.Box, { flexDirection: "column", 
            //alignItems={"flex-start"}
            alignSelf: "center", width: "200" },
            react_1.default.createElement(ink_1.Text, { color: "blue" }, phase),
            react_1.default.createElement(ink_1.Newline, null),
            react_1.default.createElement(ink_1.Text, { color: "green" },
                react_1.default.createElement(ink_progress_bar_1.default, { left: 100, percent: percent })))) : null,
        react_1.default.createElement(ink_1.Newline, null),
        react_1.default.createElement(ink_1.Box, { alignSelf: "flex-start", flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, { color: "yellow" }, "Wybierz opcje:"),
            react_1.default.createElement(SelectInput_1.default, { items: options, onSelect: (item) => handleSelect(item) }))));
};
exports.default = RealizationView;
