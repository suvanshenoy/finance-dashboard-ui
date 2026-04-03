import * as React from "react";
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
	const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	React.useEffect(() => {
		const handleResize = () => {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		};
		
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

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

	const getOuterRadius = () => {
		if (dimensions.width < 640) return 50;
		if (dimensions.width < 768) return 60;
		if (dimensions.width < 1024) return 70;
		return 80;
	};

	const getLegendProps = () => {
		if (dimensions.width < 640) {
			return {
				wrapperStyle: {
					paddingTop: '10px',
					fontSize: '12px'
				},
				layout: 'horizontal' as const,
				align: 'center' as const
			};
		}
		return {
			wrapperStyle: {
				paddingTop: '20px',
				fontSize: '14px'
			},
			layout: 'vertical' as const,
			align: 'right' as const
		};
	};

	const renderCustomLabel = (props: PieLabelRenderProps) => {
		const { payload } = props;
		const total = chartData.reduce((sum, item) => sum + item.amount, 0);
		const percentage = ((payload.amount / total) * 100).toFixed(1);
		return `${percentage}%`;
	};

	const chartData: ChartData[] = spendingData.map((item) => {
		const category = categories.find((c) => c.name === item.category);
		return {
			...item,
			color: category?.color || "#6b7280",
			icon: category?.icon || "📊",
		};
	});

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
			<div className="h-64 sm:h-72 md:h-80 lg:h-96">
				<Recharts.ResponsiveContainer width="100%" height="100%">
					<Recharts.PieChart>
						<Recharts.Pie
							data={chartData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomLabel}
							outerRadius={getOuterRadius()}
							fill="#8884d8"
							dataKey="amount"
							nameKey="category"
						>
							{chartData.map((entry, index) => (
								<Recharts.Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Recharts.Pie>
						<Recharts.Tooltip content={<CustomTooltip />} />
						<Recharts.Legend
							{...getLegendProps()}
							iconType="circle"
							formatter={(value: string) => {
								const item = chartData.find((d) => d.category === value);
								return (
									<span className="flex items-center gap-1 sm:gap-2">
										<span className="text-sm sm:text-base">{item?.icon}</span>
										<span className="text-xs sm:text-sm">{value}</span>
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
