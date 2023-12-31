import { Transaction } from "../interfaces/Transaction";
import { getBaseURL, getProductImageURL } from "../config/Configuration";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { Product } from "../interfaces/Product";
import { Order } from "../interfaces/Order";
import { Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { getDate } from "../utilities/Date";

interface Props {
	products: Product[];
}

const Orders = ({ products }: Props) => {
	const { isLoading, error, onError } = useOutletContext<ContextType>();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isPurchasedLoading, setIsPurchasedLoading] = useState(false);

	const user: User | null = useAuth();
	if (!user) return;

	useEffect(() => {
		setIsPurchasedLoading(true);
		const userId = user.id;
		axios
			.get(`${getBaseURL()}/transactions/${userId}`)
			.then((res) => {
				if (res.data !== null) {
					setTransactions(res.data);
				}
				setIsPurchasedLoading(false);
			})
			.catch((error) => {
				setIsPurchasedLoading(false);
				onError(`Couldn't fetch orders because ${error.message}`);
			});
	}, []);

	if (
		(!products.length && isLoading) ||
		(!transactions.length && isPurchasedLoading)
	) {
		return (
			<main className="wrapper text-center">
				<Spinner
					animation="border"
					className="my-5"
					style={{ width: 50, height: 50 }}
				/>
			</main>
		);
	}

	const orders: Order[] = [];

	if (Array.isArray(transactions) && Array.isArray(products)) {
		transactions.forEach((t) => {
			const product = products.find((product) => product.id == t.productId);
			if (product) {
				const order: Order = {
					...t,
					image: product.imageName,
					name: product.name,
					price: product.price,
					date: getDate(t.date),
				};
				orders.push(order);
			}
		});
	}

	if (!Array.isArray(orders) || orders.length == 0) {
		if (!error) {
			return (
				<h2 className="py-1 text-white text-center">
					You don't have ony orders!
				</h2>
			);
		} else {
			return;
		}
	}

	const ordersReversed = orders.slice().reverse();
	return (
		<div className="orders p-2 pb-5 mb-5">
			<h1 className="py-1 text-white text-center pb-2">Your Orders</h1>
			{ordersReversed.map((o, i) => (
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
								<span className="badge rounded-pill text-bg-warning text-nowrap fw-bold">
									{o.status}
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Orders;
