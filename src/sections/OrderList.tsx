import { Table } from "react-bootstrap";
import { PurchasedProduct } from "../interfaces/PurchasedProduct";
import { getBaseURL, getProductImageURL } from "./../config/Configuration";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { Product } from "../interfaces/Product";
import { Order } from "../interfaces/Order";

interface Props {
	products: Product[];
}

const OrderList = ({ products }: Props) => {
	const [purchasedProducts, setPurchasedProducts] = useState<
		PurchasedProduct[]
	>([]);

	const user: User | null = useAuth();
	if (!user) return;

	useEffect(() => {
		axios.post(getBaseURL() + "products/purchased/all", user).then((res) => {
			if (res.data !== null) {
				setPurchasedProducts(res.data);
			}
		});
	}, []);

	const orders: Order[] = [];

	if (Array.isArray(purchasedProducts) && Array.isArray(products)) {
		purchasedProducts.forEach((p) => {
			const product = products.find((product) => product.id == p.product);
			if (product) {
				const order: Order = {
					...p,
					image: product.image,
					name: product.name,
					price: product.price,
				};
				orders.push(order);
			}
		});
	}

	if (Array.isArray(orders) && orders.length > 0) {
		return (
			<div className="d-flex flex-column align-items-center">
				<h1 className="py-1 text-white">Orders</h1>
				<Table
					bordered
					hover
					variant="dark"
					className="pe-none"
					style={{ maxWidth: "1100px" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr className="pe-auto" key={index}>
								<td>{index + 1}</td>
								<td>
									<img
										src={getProductImageURL(order.image)}
										style={{ width: "175px", maxHeight: "125px" }}
										className="object-fit-contain"
									/>
								</td>
								<td>{order.name}</td>
								<td>${order.price}</td>
								<td>{order.quantity}</td>
								<td>{order.status}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	} else {
		return (
			<h2 className="py-1 text-white text-center">
				You don't have ony orders!
			</h2>
		);
	}
};

export default OrderList;
