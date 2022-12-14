import React from "react";
import Summary from "../../Components/Summary/Summary";
import { OrderSummary } from "../../Types/types";

type Props = {
	summary: OrderSummary;
};
const SummaryView = (props: Props) => {
	const { summary } = props;
	return <Summary orderSummary={summary} />;
};

export default SummaryView;
