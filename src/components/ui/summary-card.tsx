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
				"bg-card rounded-lg shadow-sm border border-border p-6 transition-all hover:shadow-md",
				className,
			)}
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-muted-foreground">
						{title}
					</p>
					<p className="text-2xl font-bold text-foreground mt-2">
						{value}
					</p>
					{change && (
						<p
							className={cn(
								"text-sm mt-2",
								changeType === "positive" && "text-green-600",
								changeType === "negative" && "text-red-600",
								changeType === "neutral" && "text-muted-foreground",
							)}
						>
							{change}
						</p>
					)}
				</div>
				{icon && <div className="text-muted-foreground">{icon}</div>}
			</div>
		</div>
	);
}
