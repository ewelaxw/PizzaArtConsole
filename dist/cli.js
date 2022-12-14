#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
//import meow from "meow";
const ui_1 = __importDefault(require("./ui"));
const RoutersProvider_1 = __importDefault(require("./Providers/RoutesProvider/RoutersProvider"));
const UserProvider_1 = __importDefault(require("./Providers/UserProvider/UserProvider"));
/*
const cli = meow(`
    Usage
      $ PizzeriaRt

    Options
        --name  Your name

    Examples
      $ PizzeriaRt --name=Jane
      Hello, Jane
`, {
    flags: {
        name: {
            type: 'string'
        }
    }
});*/
(0, ink_1.render)(react_1.default.createElement(RoutersProvider_1.default, null,
    react_1.default.createElement(UserProvider_1.default, null,
        react_1.default.createElement(ui_1.default, null))));
