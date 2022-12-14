import React, { useContext } from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
//import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import MainPage from "./MainPage/MainPage";
import { RouterContext } from "./Providers/RoutesProvider/RoutersProvider";
import { OrderSummary, Route } from "./Types/types";
import HeroPage from "./Views/HeroPage/HeroPage";
import OrderView from "./Views/OrderView/OrderView";
import RealizationView from "./Views/RealizationView/RealizationView";
import SummaryView from "./Views/SummaryView/SummaryView";

const App = () => {
	const { currentRoute } = useContext(RouterContext);

	const switchComponents = (currentRoute: Route) => {
		switch (currentRoute.currentRoute) {
			case "/Login": {
				return <LoginForm />;
			}
			case "/Register": {
				return <RegisterForm />;
			}
			case "/Main": {
				return <MainPage />;
			}
			case "/OrderView": {
				return <OrderView id={currentRoute.id!} />;
			}
			case "/": {
				return <HeroPage />;
			}
			case "/Summary": {
				return <SummaryView summary={currentRoute.payload as OrderSummary} />;
			}
			case "/Realization": {
				return <RealizationView />;
			}
			default: {
				return <RegisterForm />;
			}
		}
	};
	return switchComponents(currentRoute);
};

export default App;
