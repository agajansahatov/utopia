export interface Transaction {
	id: number;
	userId: number;
	productId: number;
	destination: string;
	status: string;
	quantity: number;
	date: string;
}
