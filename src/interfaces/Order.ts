export interface Order {
	userId: number;
	productId: number;
	destination: string;
	status: string;
	quantity: number;
	date: string;
	image: string;
	name: string;
	price: string;
}