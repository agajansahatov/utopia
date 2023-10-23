export function getDate(): string {
	const today: Date = new Date();
	const year: number = today.getFullYear();
	const month: number = today.getMonth() + 1; // Months are zero-based, so we add 1
	const day: number = today.getDate();

	return `${day}.${month}.${year}`;
}
