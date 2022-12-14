import { Form } from "ink-form";
import React, { useState, useContext } from "react";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";
import { Text, useInput } from "ink";
import { UserContext } from "../../Providers/UserProvider/UserProvider";
//@ts-ignore
import Axios from "axios";
const axios = require("axios");

type RegisterFormValue = {
	userName: string;
	password: string;
	repeatPassword: string;
	city: string;
	street: string;
};
const RegisterForm = () => {
	const { handleChangeRoute } = useContext(RouterContext);
	const { handleSetUser } = useContext(UserContext);

	useInput((input, key) => {
		if (key.ctrl && input === "d") {
			handleChangeRoute("/");
		}
	});
	const [iserror, setIsError] = useState("");

	const validate = (values: RegisterFormValue) => {
		if (values.password !== values.repeatPassword) {
			setIsError("Hasła muszą się zgadzać");
		} else {
			const { userName, password, city, street } = values;

			axios
				.post("http://localhost:8000/Register", {
					name: userName,
					password,
					city,
					street,
				})
				.then((response: any) => {
					const user = response.data;
					handleSetUser(user);
					handleChangeRoute("/Main");
				})
				.catch(() => setIsError("Nie udało się zarejestrować"));
		}
	};
	return (
		<>
			<Form
				onSubmit={(values) => validate(values as RegisterFormValue)}
				onChange={() => {
					iserror && setIsError("");
				}}
				form={{
					title: "",
					sections: [
						{
							title: "Rejestracja",
							fields: [
								{
									type: "string",
									name: "userName",
									label: "Użytkownik",
									required: true,
									initialValue: "",
								},
								{
									type: "string",
									name: "password",
									label: "Hasło",
									required: true,
									mask: "*",
								},

								{
									type: "string",
									name: "repeatPassword",
									label: "Powtórz hasło",
									required: true,
									mask: "*",
								},
							],
						},

						{
							title: "Dane adresowe",
							fields: [
								{
									type: "string",
									name: "city",
									label: "Miasto",
									required: true,
									initialValue: "",
								},
								{
									type: "string",
									name: "street",
									label: "Ulica i numer domu",
									required: true,
								},
							],
						},
					],
				}}
			/>
			{!!iserror && <Text color={"red"}>Hasła muszą się zgadzać</Text>}
			<Text color={"green"}>Wciśnij ctrl+d, aby wyjść</Text>
		</>
	);
};
export default RegisterForm;
