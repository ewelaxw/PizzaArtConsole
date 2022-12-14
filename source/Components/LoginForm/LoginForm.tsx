import axios from "axios";
import { Text, useInput } from "ink";
import { Form } from "ink-form";
import React, { useContext, useState } from "react";
import { RouterContext } from "../../Providers/RoutesProvider/RoutersProvider";
import { UserContext } from "../../Providers/UserProvider/UserProvider";

type LoginFormValue = {
	userName: string;
	password: string;
};

const LoginForm = () => {
	const { handleChangeRoute } = useContext(RouterContext);
	const { handleSetUser } = useContext(UserContext);

	useInput((input, key) => {
		if (key.ctrl && input === "d") {
			handleChangeRoute("/");
		}
	});
	const [iserror, setIsError] = useState("");

	const validate = (values: LoginFormValue) => {
		const { userName, password } = values;

		axios
			.post("http://localhost:8000/Login", {
				name: userName,
				password,
			})
			.then((response: any) => {
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

	return (
		<>
			<Form
				onSubmit={(value) => {
					validate(value as LoginFormValue);
				}}
				onChange={() => {
					iserror && setIsError("");
				}}
				form={{
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
				}}
			/>
			{!!iserror && <Text color={"red"}>Nie prawidłowy login lub hasło</Text>}
			<Text color={"green"}>Wciśnij ctrl+d, aby wyjść</Text>
		</>
	);
};

export default LoginForm;
