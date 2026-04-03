import * as LucideReact from "lucide-react";
import * as Store from "../../store";

export function TransactionList() {
	const {
		getFilteredTransactions,
		filters,
		setFilters,
		resetFilters,
		categories,
		currentRole,
		deleteTransaction,
	} = Store.useFinanceStore();

	const transactions = getFilteredTransactions();

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const getCategoryIcon = (categoryName: string) => {
		const category = categories.find((c) => c.name === categoryName);
		return category?.icon || "📊";
	};

	const handleSort = (field: "date" | "amount" | "category") => {
		const newOrder =
			filters.sortBy === field && filters.sortOrder === "desc" ? "asc" : "desc";
		setFilters({ sortBy: field, sortOrder: newOrder });
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this transaction?")) {
			deleteTransaction(id);
		}
	};

	return (
		<div className="rounded-lg shadow-sm border">
			<div className="p-6 border-b">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-foreground">
						Transactions
					</h3>
					{currentRole === "admin" && (
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<LucideReact.Plus className="w-4 h-4" />
							Add Transaction
						</button>
					)}
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1 relative">
						<LucideReact.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search transactions..."
							value={filters.search}
							onChange={(e) => setFilters({ search: e.target.value })}
							className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground"
							style={{ backgroundColor: "hsl(var(--popover))" }}
						/>
					</div>

					<select
						value={filters.category}
						onChange={(e) => setFilters({ category: e.target.value })}
						className="px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground"
						style={{ backgroundColor: "hsl(var(--popover))" }}
					>
						<option value="all">All Categories</option>
						{categories.map((cat) => (
							<option key={cat.name} value={cat.name}>
								{cat.icon} {cat.name}
							</option>
						))}
					</select>

					<select
						value={filters.type}
						onChange={(e) => setFilters({ type: e.target.value })}
						className="px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground"
						style={{ backgroundColor: "hsl(var(--popover))" }}
					>
						<option value="all">All Types</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>

					<button
						type="button"
						onClick={resetFilters}
						className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						Reset
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				{transactions.length === 0 ? (
					<div className="p-12 text-center text-muted-foreground">
						No transactions found
					</div>
				) : (
					<table className="w-full min-w-150">
						<thead className="bg-muted">
							<tr>
								<th className="px-6 py-3 text-left">
									<button
										type="button"
										onClick={() => handleSort("date")}
										className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
									>
										Date
										<LucideReact.ArrowUpDown className="w-3 h-3" />
									</button>
								</th>
								<th className="px-6 py-3 text-left">
									<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Description
									</span>
								</th>
								<th className="px-6 py-3 text-left">
									<button
										type="button"
										onClick={() => handleSort("category")}
										className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
									>
										Category
										<LucideReact.ArrowUpDown className="w-3 h-3" />
									</button>
								</th>
								<th className="px-6 py-3 text-left">
									<button
										type="button"
										onClick={() => handleSort("amount")}
										className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
									>
										Amount
										<LucideReact.ArrowUpDown className="w-3 h-3" />
									</button>
								</th>
								{currentRole === "admin" && (
									<th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
										Actions
									</th>
								)}
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{transactions.map((transaction) => (
								<tr key={transaction.id} className="hover:bg-muted">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
										{formatDate(transaction.date)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-foreground">
											{transaction.description}
										</div>
										<div className="text-xs text-muted-foreground">
											{transaction.type}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-2">
											<span className="text-lg">
												{getCategoryIcon(transaction.category)}
											</span>
											<span className="text-sm text-foreground">
												{transaction.category}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`text-sm font-medium ${
												transaction.type === "income"
													? "text-success-600"
													: "text-error-600"
											}`}
										>
											{transaction.type === "income" ? "+" : "-"}
											{formatCurrency(transaction.amount)}
										</span>
									</td>
									{currentRole === "admin" && (
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="text-blue-600 hover:text-blue-800"
												>
													<LucideReact.Edit className="w-4 h-4" />
												</button>
												<button
													type="button"
													onClick={() => handleDelete(transaction.id)}
													className="text-red-600 hover:text-red-800"
												>
													<LucideReact.Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
