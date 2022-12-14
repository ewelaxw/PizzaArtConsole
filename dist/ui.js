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
const LoginForm_1 = __importDefault(require("./Components/LoginForm/LoginForm"));
//import LoginForm from "./Components/LoginForm/LoginForm";
const RegisterForm_1 = __importDefault(require("./Components/RegisterForm/RegisterForm"));
const MainPage_1 = __importDefault(require("./MainPage/MainPage"));
const RoutersProvider_1 = require("./Providers/RoutesProvider/RoutersProvider");
const HeroPage_1 = __importDefault(require("./Views/HeroPage/HeroPage"));
const OrderView_1 = __importDefault(require("./Views/OrderView/OrderView"));
const RealizationView_1 = __importDefault(require("./Views/RealizationView/RealizationView"));
const SummaryView_1 = __importDefault(require("./Views/SummaryView/SummaryView"));
const App = () => {
    const { currentRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const switchComponents = (currentRoute) => {
        switch (currentRoute.currentRoute) {
            case "/Login": {
                return react_1.default.createElement(LoginForm_1.default, null);
            }
            case "/Register": {
                return react_1.default.createElement(RegisterForm_1.default, null);
            }
            case "/Main": {
                return react_1.default.createElement(MainPage_1.default, null);
            }
            case "/OrderView": {
                return react_1.default.createElement(OrderView_1.default, { id: currentRoute.id });
            }
            case "/": {
                return react_1.default.createElement(HeroPage_1.default, null);
            }
            case "/Summary": {
                return react_1.default.createElement(SummaryView_1.default, { summary: currentRoute.payload });
            }
            case "/Realization": {
                return react_1.default.createElement(RealizationView_1.default, null);
            }
            default: {
                return react_1.default.createElement(RegisterForm_1.default, null);
            }
        }
    };
    return switchComponents(currentRoute);
};
exports.default = App;
