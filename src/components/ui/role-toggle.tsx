import * as LucideReact from "lucide-react";
import * as Store from "../../store";
import type { UserRole } from "../../types";

export function RoleToggle() {
	const { currentRole, setRole } = Store.useFinanceStore();

	return (
		<div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
			<LucideReact.Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
				Role:
			</span>
			<select
				value={currentRole}
				onChange={(e) => setRole(e.target.value as UserRole)}
				className="text-sm px-4 py-2 border border-none focus:outline-none  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
			>
				<option value="viewer">Viewer</option>
				<option value="admin">Admin</option>
			</select>
			<div className="ml-2">
				{currentRole === "admin" ? (
					<LucideReact.Shield className="w-4 h-4 text-blue-500" />
				) : (
					<LucideReact.Eye className="w-4 h-4 text-gray-400" />
				)}
			</div>
		</div>
	);
}
