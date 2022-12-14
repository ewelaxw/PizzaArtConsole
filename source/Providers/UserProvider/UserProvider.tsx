import React, { createContext, PropsWithChildren, useState } from "react";
import { AuthenticatedUser } from "../../Data/DataStorage";

export const UserContext = createContext({
	user: null as AuthenticatedUser | null,
	handleSetUser: (user: AuthenticatedUser) => {
		user;
	},
});

const UserProvider = (props: PropsWithChildren) => {
	const [user, setUser] = useState<null | AuthenticatedUser>(null);

	const handleSetUser = (user: AuthenticatedUser) => {
		setUser(user);
	};

	const context = {
		user,
		handleSetUser,
	};

	return (
		<UserContext.Provider value={context}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
