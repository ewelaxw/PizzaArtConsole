"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Summary_1 = __importDefault(require("../../Components/Summary/Summary"));
const SummaryView = (props) => {
    const { summary } = props;
    return react_1.default.createElement(Summary_1.default, { orderSummary: summary });
};
exports.default = SummaryView;
