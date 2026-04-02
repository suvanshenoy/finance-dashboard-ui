import * as React from "react";
import * as Layouts from "../components/layouts";
import * as Sections from "../components/sections";
import * as Store from "../store";

export function Dashboard() {
	const { darkMode } = Store.useFinanceStore();

	React.useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
			document.body.className = document.body.className
				.replace(/bg-\w+-\d+/g, "")
				.trim();
			document.body.classList.add("bg-gray-900");
		} else {
			document.documentElement.classList.remove("dark");
			document.body.className = document.body.className
				.replace(/bg-\w+-\d+/g, "")
				.trim();
			document.body.classList.add("bg-gray-50");
		}
	}, [darkMode]);

	return (
		<div className="min-h-screen">
			<Layouts.Header />
			<Layouts.DashboardLayout>
				<Sections.SummaryCards />
				<Sections.ChartsSection />
				<Sections.MainContent />
			</Layouts.DashboardLayout>
		</div>
	);
}
