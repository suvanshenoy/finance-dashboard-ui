import * as Ui from "../ui";

export function MainContent() {
	return (
		<>
			<div className="mb-8">
				<Ui.Insights />
			</div>

			<div>
				<Ui.TransactionList />
			</div>
		</>
	);
}
