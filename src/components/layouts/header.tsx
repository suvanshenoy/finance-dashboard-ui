import * as LucideReact from "lucide-react";
import * as Store from "../../store";
import * as Ui from "../ui";

export function Header() {
	const { darkMode, toggleDarkMode } = Store.useFinanceStore();

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<LucideReact.DollarSign className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">
							Finance Dashboard
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<Ui.RoleToggle />
						<button
							type="button"
							onClick={toggleDarkMode}
							className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							{darkMode ? (
								<LucideReact.Sun className="w-5 h-5 text-yellow-500" />
							) : (
								<LucideReact.Moon className="w-5 h-5 text-gray-600" />
							)}
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
