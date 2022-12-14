import React, { PropsWithChildren } from "react";
import { Route, Routes } from "../../Types/types";
export declare const RouterContext: React.Context<{
    currentRoute: Route;
    handleChangeRoute: (route: Routes, id?: string, payload?: object) => void;
}>;
declare const RouterProvider: (props: PropsWithChildren) => JSX.Element;
export default RouterProvider;
