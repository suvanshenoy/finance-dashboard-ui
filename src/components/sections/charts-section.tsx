import * as Ui from "../ui";

export function ChartsSection() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			<Ui.BalanceTrendChart />
			<Ui.SpendingChart />
		</div>
	);
}
