import * as Layouts from "../components/layouts";
import * as Sections from "../components/sections";

export function Dashboard() {
	return (
		<>
			<Layouts.Header />
			<div>
				<Sections.SummaryCards />
			</div>
		</>
	);
}
