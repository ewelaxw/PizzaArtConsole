import React, { PropsWithChildren } from "react";
import { AuthenticatedUser } from "../../Data/DataStorage";
export declare const UserContext: React.Context<{
    user: AuthenticatedUser | null;
    handleSetUser: (user: AuthenticatedUser) => void;
}>;
declare const UserProvider: (props: PropsWithChildren) => JSX.Element;
export default UserProvider;
