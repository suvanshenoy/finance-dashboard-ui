import * as Ui from "../ui";

export function ChartsSection() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
			<Ui.BalanceTrendChart />
			<Ui.SpendingChart />
		</div>
	);
}
