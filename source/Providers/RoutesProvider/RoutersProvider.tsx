import React, { createContext, PropsWithChildren, useState } from "react";
import { Route, Routes } from "../../Types/types";

export const RouterContext = createContext({
	currentRoute: { currentRoute: "/", id: "", payload: {} } as Route,
	handleChangeRoute: (route: Routes, id?: string, payload?: object) => {
		route;
		id;
		payload;
	},
});

const RouterProvider = (props: PropsWithChildren) => {
	const [currentRoute, setCurrentRoute] = useState<Route>({
		currentRoute: "/",
		id: "",
	});

	const handleChangeRoute = (route: Routes, id?: string, payload?: object) => {
		setCurrentRoute({ currentRoute: route, id, payload });
	};
	const context = {
		currentRoute,
		handleChangeRoute,
	};

	return (
		<RouterContext.Provider value={context}>
			{props.children}
		</RouterContext.Provider>
	);
};

export default RouterProvider;
