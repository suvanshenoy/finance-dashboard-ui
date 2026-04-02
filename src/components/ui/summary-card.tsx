import { cn } from "../../cn.ts";

type SummaryCardProps = {
	title: string;
	value: string;
	change?: string;
	changeType?: "positive" | "negative" | "neutral";
	icon?: React.ReactNode;
	className?: string;
};

export function SummaryCard({
	title,
	value,
	change,
	changeType = "neutral",
	icon,
	className,
}: SummaryCardProps) {
	return (
		<div
			className={cn(
				"bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md",
				className,
			)}
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						{title}
					</p>
					<p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
						{value}
					</p>
					{change && (
						<p
							className={cn(
								"text-sm mt-2",
								changeType === "positive" &&
									"text-green-600 dark:text-green-400",
								changeType === "negative" && "text-red-600 dark:text-red-400",
								changeType === "neutral" && "text-gray-600 dark:text-gray-400",
							)}
						>
							{change}
						</p>
					)}
				</div>
				{icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
			</div>
		</div>
	);
}
