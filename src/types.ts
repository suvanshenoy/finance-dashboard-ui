export type Transaction = {
	id: string;
	date: string;
	description: string;
	amount: number;
	category: string;
	type: "income" | "expense";
};

export type Category = {
	name: string;
	icon: string;
	color: string;
};

export type BalanceTrend = {
	date: string;
	balance: number;
};

export type SpendingInsight = {
	category: string;
	amount: number;
	percentage: number;
};

export type UserRole = "viewer" | "admin";

export type Filters = {
	category: string;
	type: string;
	search: string;
	sortBy: "date" | "amount" | "category";
	sortOrder: "asc" | "desc";
};

export interface AppState {
	transactions: Transaction[];
	categories: Category[];
	balanceTrend: BalanceTrend[];
	currentRole: UserRole;
	filters: Filters;
	darkMode: boolean;
}
