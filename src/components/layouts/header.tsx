import { DollarSign } from "lucide-react";

export function Header() {
	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<DollarSign className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">
							Finance Dashboard
						</h1>
					</div>
				</div>
			</div>
		</header>
	);
}
