export interface PurchasedProduct {
	id: number;
	user: number;
	product: number;
	destination: string;
	status: string;
	quantity: number;
	date: string;
}

export interface Order {
	id: number;
	user: number;
	product: number;
	quantity: number;
	destination: string;
	status: string;
	date: string;
	image: string;
	name: string;
	price: string;
}
