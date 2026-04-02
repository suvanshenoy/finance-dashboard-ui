import * as Zustand from "zustand";
import * as ZustandMiddleware from "zustand/middleware";
import type {
	AppState,
	BalanceTrend,
	Category,
	Transaction,
	UserRole,
} from "../types";

type SortKey = "date" | "amount" | "category";

interface FinanceStore extends AppState {
	setTransactions: (transactions: Transaction[]) => void;
	addTransaction: (transaction: Transaction) => void;
	updateTransaction: (id: string, updates: Partial<Transaction>) => void;
	deleteTransaction: (id: string) => void;
	setRole: (role: UserRole) => void;
	setFilters: (filters: Partial<AppState["filters"]>) => void;
	toggleDarkMode: () => void;
	resetFilters: () => void;

	getFilteredTransactions: () => Transaction[];
	getTotalBalance: () => number;
	getTotalIncome: () => number;
	getTotalExpenses: () => number;
	getSpendingByCategory: () => { category: string; amount: number }[];
}

const mockTransactions: Transaction[] = [
	{
		id: "1",
		date: "2024-01-15",
		description: "Salary",
		amount: 5000,
		category: "Salary",
		type: "income",
	},
	{
		id: "2",
		date: "2024-01-16",
		description: "Grocery Shopping",
		amount: 150,
		category: "Food",
		type: "expense",
	},
	{
		id: "3",
		date: "2024-01-17",
		description: "Electric Bill",
		amount: 120,
		category: "Utilities",
		type: "expense",
	},
	{
		id: "4",
		date: "2024-01-18",
		description: "Freelance Project",
		amount: 800,
		category: "Freelance",
		type: "income",
	},
	{
		id: "5",
		date: "2024-01-19",
		description: "Restaurant",
		amount: 85,
		category: "Food",
		type: "expense",
	},
	{
		id: "6",
		date: "2024-01-20",
		description: "Gas Station",
		amount: 60,
		category: "Transport",
		type: "expense",
	},
	{
		id: "7",
		date: "2024-01-21",
		description: "Netflix Subscription",
		amount: 15,
		category: "Entertainment",
		type: "expense",
	},
	{
		id: "8",
		date: "2024-01-22",
		description: "Gym Membership",
		amount: 50,
		category: "Health",
		type: "expense",
	},
	{
		id: "9",
		date: "2024-01-23",
		description: "Investment Return",
		amount: 200,
		category: "Investment",
		type: "income",
	},
	{
		id: "10",
		date: "2024-01-24",
		description: "Coffee Shop",
		amount: 12,
		category: "Food",
		type: "expense",
	},
];

const mockCategories: Category[] = [
	{ name: "Food", icon: "🍔", color: "#ef4444" },
	{ name: "Transport", icon: "🚗", color: "#3b82f6" },
	{ name: "Utilities", icon: "💡", color: "#f59e0b" },
	{ name: "Entertainment", icon: "🎬", color: "#8b5cf6" },
	{ name: "Health", icon: "💊", color: "#10b981" },
	{ name: "Shopping", icon: "🛍️", color: "#ec4899" },
	{ name: "Salary", icon: "💰", color: "#22c55e" },
	{ name: "Freelance", icon: "💻", color: "#06b6d4" },
	{ name: "Investment", icon: "📈", color: "#6366f1" },
];

const generateBalanceTrend = (): BalanceTrend[] => {
	const trend: BalanceTrend[] = [];
	let balance = 2000;

	for (let i = 30; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		balance += Math.random() * 500 - 200;

		trend.push({
			date: date.toISOString().split("T")[0],
			balance: Math.round(balance),
		});
	}

	return trend;
};

const storeCreator: Zustand.StateCreator<FinanceStore> = (set, get) => ({
	transactions: mockTransactions,
	categories: mockCategories,
	balanceTrend: generateBalanceTrend(),
	currentRole: "admin",
	darkMode: false,

	filters: {
		category: "all",
		type: "all",
		search: "",
		sortBy: "date",
		sortOrder: "desc",
	},

	setTransactions: (transactions) => {
		set({ transactions });
	},

	addTransaction: (transaction) => {
		set((state) => ({
			transactions: [...state.transactions, transaction],
		}));
	},

	updateTransaction: (id, updates) => {
		set((state) => ({
			transactions: state.transactions.map((t) =>
				t.id === id ? { ...t, ...updates } : t,
			),
		}));
	},

	deleteTransaction: (id) => {
		set((state) => ({
			transactions: state.transactions.filter((t) => t.id !== id),
		}));
	},

	setRole: (role) => {
		set({ currentRole: role });
	},

	setFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		}));
	},

	toggleDarkMode: () => {
		set((state) => ({ darkMode: !state.darkMode }));
	},

	resetFilters: () => {
		set({
			filters: {
				category: "all",
				type: "all",
				search: "",
				sortBy: "date",
				sortOrder: "desc",
			},
		});
	},

	getFilteredTransactions: () => {
		const { transactions, filters } = get();
		let filtered = [...transactions];

		if (filters.category !== "all") {
			filtered = filtered.filter((t) => t.category === filters.category);
		}

		if (filters.type !== "all") {
			filtered = filtered.filter((t) => t.type === filters.type);
		}

		if (filters.search) {
			const search = filters.search.toLowerCase();
			filtered = filtered.filter(
				(t) =>
					t.description.toLowerCase().includes(search) ||
					t.category.toLowerCase().includes(search),
			);
		}

		filtered.sort((a, b) => {
			const { sortBy, sortOrder } = filters;
			const key = sortBy as SortKey;

			let aValue: string | number = a[key];
			let bValue: string | number = b[key];

			if (key === "date") {
				aValue = new Date(aValue as string).getTime();
				bValue = new Date(bValue as string).getTime();
			}

			return sortOrder === "asc"
				? aValue > bValue
					? 1
					: -1
				: aValue < bValue
					? 1
					: -1;
		});

		return filtered;
	},

	getTotalBalance: () => {
		return get().transactions.reduce(
			(sum: number, t: Transaction) =>
				t.type === "income" ? sum + t.amount : sum - t.amount,
			0,
		);
	},

	getTotalIncome: () => {
		return get()
			.transactions.filter((t: Transaction) => t.type === "income")
			.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
	},

	getTotalExpenses: () => {
		return get()
			.transactions.filter((t: Transaction) => t.type === "expense")
			.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
	},

	getSpendingByCategory: () => {
		const spending: Record<string, number> = {};

		get()
			.transactions.filter((t: Transaction) => t.type === "expense")
			.forEach((t: Transaction) => {
				spending[t.category] = (spending[t.category] ?? 0) + t.amount;
			});

		return Object.entries(spending).map(([category, amount]) => ({
			category,
			amount,
		}));
	},
});

export const useFinanceStore = Zustand.create<FinanceStore>()(
	ZustandMiddleware.persist(storeCreator, {
		name: "finance-storage",
	}),
);
