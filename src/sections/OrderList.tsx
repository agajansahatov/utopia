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
			<div className="orders p-2 pb-5 mb-5">
				<h1 className="py-1 text-white text-center pb-2">Your Orders</h1>
				{orders.map((o, i) => (
					<div className="order row bg-dark m-0 p-2 py-3 mb-3 rounded" key={i}>
						<div className="col-4">
							<img
								src={getProductImageURL(o.image)}
								alt="Product image"
								className="order__image object-fit-contain"
							/>
						</div>
						<div className="col-8 d-flex flex-column justify-content-between">
							<div className="d-flex justify-content-between">
								<p className="lh-sm m-0 text-wrap">{o.name}</p>
								<p className="d-none d-sm-block text-nowrap">{o.date}</p>
							</div>
							<div className="d-flex justify-content-between">
								<div className="">
									<p className="mb-0 text-nowrap">${o.price}</p>
									<p className="mb-0 text-nowrap fw-bold">x{o.quantity}</p>
								</div>
								<div className="d-flex flex-column justify-content-end">
									<span className="d-sm-none text-nowrap">{o.date}</span>
									<span className="badge rounded-pill text-bg-info text-nowrap fw-bold">
										{o.status}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
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
