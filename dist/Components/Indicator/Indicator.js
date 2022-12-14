"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const Indicator = ({ isSelected = false }) => (react_1.default.createElement(ink_1.Box, { marginRight: 1 }, isSelected ? react_1.default.createElement(ink_1.Text, { color: "green" }, "\u25B6") : react_1.default.createElement(ink_1.Text, null)));
exports.default = Indicator;
//🍕
//🌶️
//🍅
//👛
//💰
//💵
//🌶
