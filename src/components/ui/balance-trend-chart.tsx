import * as Recharts from "recharts";
import * as Store from "../../store";

export function BalanceTrendChart() {
	const { balanceTrend } = Store.useFinanceStore();

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Balance Trend
			</h3>
			<div className="h-64">
				<Recharts.ResponsiveContainer width="100%" height="100%">
					<Recharts.LineChart data={balanceTrend}>
						<Recharts.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
						<Recharts.XAxis
							dataKey="date"
							tickFormatter={formatDate}
							stroke="#6b7280"
							fontSize={12}
						/>
						<Recharts.YAxis
							tickFormatter={formatCurrency}
							stroke="#6b7280"
							fontSize={12}
						/>
						<Recharts.Tooltip
							formatter={(value: unknown) => [
								formatCurrency(Number(value || 0)),
								"Balance",
							]}
							labelFormatter={(label) => formatDate(label as string)}
							contentStyle={{
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
							}}
						/>
						<Recharts.Line
							type="monotone"
							dataKey="balance"
							stroke="#3b82f6"
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6 }}
						/>
					</Recharts.LineChart>
				</Recharts.ResponsiveContainer>
			</div>
		</div>
	);
}
