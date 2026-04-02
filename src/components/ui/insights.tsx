import * as Store from "../../store";

export function Insights() {
	const {
		getSpendingByCategory,
		getTotalExpenses,
		getTotalIncome,
		transactions,
	} = Store.useFinanceStore();
	const spendingByCategory = getSpendingByCategory();
	const totalExpenses = getTotalExpenses();
	const totalIncome = getTotalIncome();

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const getHighestSpendingCategory = () => {
		if (spendingByCategory.length === 0) return null;
		return spendingByCategory.reduce((max, current) =>
			current.amount > max.amount ? current : max,
		);
	};

	const getMonthlyComparison = () => {
		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();

		const currentMonthTransactions = transactions.filter((t) => {
			const date = new Date(t.date);
			return (
				date.getMonth() === currentMonth && date.getFullYear() === currentYear
			);
		});

		const lastMonthTransactions = transactions.filter((t) => {
			const date = new Date(t.date);
			return (
				date.getMonth() === currentMonth - 1 &&
				date.getFullYear() === currentYear
			);
		});

		const currentMonthTotal = currentMonthTransactions.reduce(
			(sum, t) => (t.type === "expense" ? sum + t.amount : sum),
			0,
		);

		const lastMonthTotal = lastMonthTransactions.reduce(
			(sum, t) => (t.type === "expense" ? sum + t.amount : sum),
			0,
		);

		const change =
			lastMonthTotal > 0
				? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
				: 0;

		return {
			current: currentMonthTotal,
			last: lastMonthTotal,
			change: change.toFixed(1),
		};
	};

	const getAverageTransaction = () => {
		const expenseTransactions = transactions.filter(
			(t) => t.type === "expense",
		);
		if (expenseTransactions.length === 0) return 0;
		return totalExpenses / expenseTransactions.length;
	};

	const highestSpending = getHighestSpendingCategory();
	const monthlyComparison = getMonthlyComparison();

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
				Financial Insights
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							📊
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Highest Spending
						</h4>
					</div>
					{highestSpending ? (
						<div>
							<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
								{formatCurrency(highestSpending.amount)}
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{highestSpending.category}
							</p>
						</div>
					) : (
						<p className="text-gray-500 dark:text-gray-400">No expense data</p>
					)}
				</div>

				<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							📈
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Monthly Comparison
						</h4>
					</div>
					<div>
						<p className="text-2xl font-bold text-green-600 dark:text-green-400">
							{Number(monthlyComparison.change) > 0 ? "+" : ""}
							{monthlyComparison.change}%
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							vs last month
						</p>
					</div>
				</div>

				<div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							💰
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Savings Rate
						</h4>
					</div>
					<div>
						<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
							{totalIncome > 0
								? Math.round(
										((totalIncome - totalExpenses) / totalIncome) * 100,
									)
								: 0}
							%
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							of income saved
						</p>
					</div>
				</div>

				<div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							📅
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Average Transaction
						</h4>
					</div>
					<div>
						<p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
							{formatCurrency(getAverageTransaction())}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							per expense
						</p>
					</div>
				</div>

				<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							🎯
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Budget Alert
						</h4>
					</div>
					<div>
						<p className="text-2xl font-bold text-red-600 dark:text-red-400">
							{Number(totalExpenses) > Number(totalIncome) ? "Over" : "Under"}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							monthly budget
						</p>
					</div>
				</div>

				<div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
							📋
						</div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							Total Transactions
						</h4>
					</div>
					<div>
						<p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
							{transactions.length}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							this period
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
