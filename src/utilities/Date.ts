export function getDate(strDate: string): string {
	const originalDate = new Date(strDate);
	
	const year = originalDate.getFullYear();
	const month = originalDate.getMonth() + 1; // Months are zero-based, so add 1
	const day = originalDate.getDate();

	return `${day}.${month}.${year}`;
}
