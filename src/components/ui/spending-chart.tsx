import * as Recharts from "recharts";
import * as Store from "../../store";

type PieLabelRenderProps = Recharts.PieLabelRenderProps;

type ChartData = {
	category: string;
	amount: number;
	color: string;
	icon: string;
};

export function SpendingChart() {
	const { getSpendingByCategory, categories } = Store.useFinanceStore();
	const spendingData = getSpendingByCategory();

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const chartData: ChartData[] = spendingData.map((item) => {
		const category = categories.find((c) => c.name === item.category);
		return {
			...item,
			color: category?.color || "#6b7280",
			icon: category?.icon || "📊",
		};
	});

	const CustomTooltip = ({
		active,
		payload,
	}: {
		active?: boolean;
		payload?: Array<{
			payload: ChartData;
		}>;
	}) => {
		if (active && payload?.length) {
			const data = payload[0].payload;
			return (
				<div
					className="rounded-lg border p-3 shadow-lg"
					style={{ backgroundColor: "hsl(var(--popover))" }}
				>
					<div className="flex items-center gap-2">
						<span className="text-lg">{data.icon}</span>
						<span className="font-medium text-foreground">{data.category}</span>
					</div>
					<p className="text-sm text-muted-foreground mt-1">
						{formatCurrency(data.amount)}
					</p>
				</div>
			);
		}
		return null;
	};

	const renderCustomLabel = (props: PieLabelRenderProps) => {
		const { payload } = props;
		const total = chartData.reduce((sum, item) => sum + item.amount, 0);
		const percentage = ((payload.amount / total) * 100).toFixed(1);
		return `${percentage}%`;
	};

	if (spendingData.length === 0) {
		return (
			<div className="rounded-lg shadow-sm border p-6">
				<h3 className="text-lg font-semibold text-foreground mb-4">
					Spending Breakdown
				</h3>
				<div className="flex items-center justify-center h-64 text-muted-foreground">
					No expense data available
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg shadow-sm border p-6">
			<h3 className="text-lg font-semibold text-foreground mb-4">
				Spending Breakdown
			</h3>
			<div className="h-48 sm:h-56 md:h-70">
				<Recharts.ResponsiveContainer width="100%" height="100%">
					<Recharts.PieChart>
						<Recharts.Pie
							data={chartData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomLabel}
							outerRadius={80}
							fill="#8884d8"
							dataKey="amount"
						>
							{chartData.map((entry, index) => (
								<Recharts.Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Recharts.Pie>
						<Recharts.Tooltip content={<CustomTooltip />} />
						<Recharts.Legend
							formatter={(value: string) => {
								const item = chartData.find((d) => d.category === value);
								return (
									<span className="flex items-center gap-2">
										<span>{item?.icon}</span>
										<span>{value}</span>
									</span>
								);
							}}
						/>
					</Recharts.PieChart>
				</Recharts.ResponsiveContainer>
			</div>
		</div>
	);
}
