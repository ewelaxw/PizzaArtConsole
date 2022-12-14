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
const axios_1 = __importDefault(require("axios"));
const ink_1 = require("ink");
const ink_form_1 = require("ink-form");
const react_1 = __importStar(require("react"));
const RoutersProvider_1 = require("../../Providers/RoutesProvider/RoutersProvider");
const UserProvider_1 = require("../../Providers/UserProvider/UserProvider");
const LoginForm = () => {
    const { handleChangeRoute } = (0, react_1.useContext)(RoutersProvider_1.RouterContext);
    const { handleSetUser } = (0, react_1.useContext)(UserProvider_1.UserContext);
    (0, ink_1.useInput)((input, key) => {
        if (key.ctrl && input === "d") {
            handleChangeRoute("/");
        }
    });
    const [iserror, setIsError] = (0, react_1.useState)("");
    const validate = (values) => {
        const { userName, password } = values;
        axios_1.default
            .post("http://localhost:8000/Login", {
            name: userName,
            password,
        })
            .then((response) => {
            const user = response.data;
            handleSetUser(user);
            handleChangeRoute("/Main");
        })
            .catch(() => setIsError("Nie udało się zalogować"));
        /*const response = dataStorage.loginUser({
            name: userName,
            password,
        });
        if (response) {
            handleSetUser(response);
            handleChangeRoute("/Main");
        } else {
            setIsError("Nie udało się zalogować");
        }*/
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_form_1.Form, { onSubmit: (value) => {
                validate(value);
            }, onChange: () => {
                iserror && setIsError("");
            }, form: {
                title: "",
                sections: [
                    {
                        title: "Logowanie",
                        fields: [
                            {
                                type: "string",
                                name: "userName",
                                label: "Użytkownik",
                                initialValue: "",
                            },
                            {
                                type: "string",
                                name: "password",
                                label: "Hasło",
                                mask: "*",
                            },
                        ],
                    },
                ],
            } }),
        !!iserror && react_1.default.createElement(ink_1.Text, { color: "red" }, "Nie prawid\u0142owy login lub has\u0142o"),
        react_1.default.createElement(ink_1.Text, { color: "green" }, "Wci\u015Bnij ctrl+d, aby wyj\u015B\u0107")));
};
exports.default = LoginForm;
