import * as LucideReact from "lucide-react";
import * as Store from "../../store";
import type { UserRole } from "../../types";

export function RoleToggle() {
	const { currentRole, setRole } = Store.useFinanceStore();

	return (
		<div
			className="flex items-center gap-2 rounded-lg p-3"
			style={{ border: "none" }}
		>
			<LucideReact.Shield className="w-4 h-4 text-muted-foreground" />
			<span className="text-sm font-medium text-foreground">Role:</span>
			<select
				value={currentRole}
				onChange={(e) => setRole(e.target.value as UserRole)}
				className="text-sm px-4 py-2 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500 text-foreground"
				style={{ backgroundColor: "hsl(var(--popover))", border: "none" }}
			>
				<option value="viewer">Viewer</option>
				<option value="admin">Admin</option>
			</select>
			<div className="ml-2">
				{currentRole === "admin" ? (
					<LucideReact.Shield className="w-4 h-4 text-blue-500" />
				) : (
					<LucideReact.Eye className="w-4 h-4 text-muted-foreground" />
				)}
			</div>
		</div>
	);
}
