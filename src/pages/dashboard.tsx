import * as Layouts from "../components/layouts";
import * as Sections from "../components/sections";

export function Dashboard() {
	return (
		<>
			<Layouts.Header />
			<Layouts.DashboardLayout>
				<Sections.SummaryCards />
				<Sections.ChartsSection />
				<Sections.MainContent />
			</Layouts.DashboardLayout>
		</>
	);
}
