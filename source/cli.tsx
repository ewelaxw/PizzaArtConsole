#!/usr/bin/env node
import React from "react";
import { render } from "ink";
//import meow from "meow";
import App from "./ui";
import RouterProvider from "./Providers/RoutesProvider/RoutersProvider";
import UserProvider from "./Providers/UserProvider/UserProvider";
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

render(
	<RouterProvider>
		<UserProvider>
			<App />
		</UserProvider>
	</RouterProvider>
);
