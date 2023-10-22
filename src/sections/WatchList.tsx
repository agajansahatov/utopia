import React, { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { Visited } from "../interfaces/Visited";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import { Product } from "../interfaces/Product";
import ProductList from "../components/ProductList";
import { Favourite } from "../interfaces/Favourite";

interface Props {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const WatchList = ({ products, favourites, onAddToCart, onLike }: Props) => {
	const [visitedProducts, setVisitedProducts] = useState<Visited[]>([]);
	const [error, setError] = useState("");
	const user: User | null = useAuth();

	useEffect(() => {
		if (user) {
			axios
				.get(`${getBaseURL()}visited/${user.id}`)
				.then((res) => {
					setVisitedProducts(res.data);
				})
				.catch((error) => {
					setError(error.message);
				});
		}
	}, []);

	const vProducts: Product[] = [];
	visitedProducts.forEach((v) => {
		vProducts.unshift(products[v.product - 1]);
	});

	return (
		<>
			<h1 className="m-0 p-0 mb-2 text-white text-center">WatchList</h1>
			<ProductList
				products={vProducts}
				favourites={favourites}
				onAddToCart={(product) => onAddToCart(product)}
				onLike={onLike}
			/>
		</>
	);
};

export default WatchList;
