import * as React from "react";
import * as Layouts from "../components/layouts";
import * as Sections from "../components/sections";
import * as Store from "../store";

export function Dashboard() {
	const { darkMode } = Store.useFinanceStore();

	React.useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Layouts.Header />
			<Layouts.DashboardLayout>
				<Sections.SummaryCards />
				<Sections.ChartsSection />
				<Sections.MainContent />
			</Layouts.DashboardLayout>
		</div>
	);
}
