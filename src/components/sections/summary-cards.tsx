import * as LucideReact from "lucide-react";
import * as Store from "../../store";
import * as Ui from "../ui";

export function SummaryCards() {
	const { getTotalBalance, getTotalIncome, getTotalExpenses } =
		Store.useFinanceStore();

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const totalBalance = getTotalBalance();
	const totalIncome = getTotalIncome();
	const totalExpenses = getTotalExpenses();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<Ui.SummaryCard
				title="Total Balance"
				value={formatCurrency(totalBalance)}
				change={totalBalance >= 0 ? "Positive" : "Negative"}
				changeType={totalBalance >= 0 ? "positive" : "negative"}
				icon={<LucideReact.DollarSign className="w-6 h-6" />}
			/>

			<Ui.SummaryCard
				title="Total Income"
				value={formatCurrency(totalIncome)}
				change="+12.5% from last month"
				changeType="positive"
				icon={<LucideReact.TrendingUp className="w-6 h-6 text-green-500" />}
			/>

			<Ui.SummaryCard
				title="Total Expenses"
				value={formatCurrency(totalExpenses)}
				change="-8.2% from last month"
				changeType="negative"
				icon={<LucideReact.TrendingDown className="w-6 h-6 text-red-500" />}
			/>
		</div>
	);
}
