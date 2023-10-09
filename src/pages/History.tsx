import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import OrderList from "../sections/OrderList";
import { useOutletContext } from "react-router-dom";
import { ContextProducts, ContextType } from "../App";
import { User } from "../interfaces/User";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { PurchasedProduct } from "../interfaces/PurchasedProduct";
import { Product } from "../interfaces/Product";
import Favourites from "../sections/Favourites";
import WatchList from "../sections/WatchList";
import { getBaseURL } from "../config/Configuration";

const sidebarLinks = [
	{
		id: 0,
		label: "Orders",
	},
	{
		id: 1,
		label: "Favourites",
	},
	{
		id: 2,
		label: "Watchlist",
	},
];

const History = () => {
	const [content, setContent] = useState(0);
	const [orders, setOrders] = useState<PurchasedProduct[]>([]);
	const { products } = useOutletContext<ContextProducts>();

	const user: User | null = useAuth();
	if (!user) return;

	useEffect(() => {
		axios.post(getBaseURL() + "products/purchased/all", user).then((res) => {
			if (res.data !== null) {
				const data: PurchasedProduct[] = res.data;
				setOrders(getOrders(products, data));
			}
		});
	}, []);

	const onContentChange = (id: number) => {
		setContent(id);
	};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
			<main className="content">
				{content == 0 && <OrderList orders={orders} />}
				{content == 1 && <Favourites />}
				{content == 2 && <WatchList />}
			</main>
		</>
	);
};

export default History;

const getOrders = (
	products: Product[],
	purchasedProducts: PurchasedProduct[]
) => {
	purchasedProducts.forEach((p) => {
		const product = products.find((product) => product.id === p.product);
		if (product) {
			p.image = product.image;
			p.name = product.name;
			p.price = product.price;
		}
	});
	return purchasedProducts;
};
