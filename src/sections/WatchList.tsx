import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import useAuth from "../hooks/useAuth";
import { Visited } from "../interfaces/Visited";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import { Product } from "../interfaces/Product";
import ProductList from "../components/ProductList";
import { Favourite } from "../interfaces/Favourite";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

interface Props {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const WatchList = ({ products, favourites, onAddToCart, onLike }: Props) => {
	const user: User | null = useAuth();
	const { onError } = useOutletContext<ContextType>();
	const [visitedProducts, setVisitedProducts] = useState<Visited[]>([]);

	useEffect(() => {
		if (user) {
			axios
				.get(`${getBaseURL()}visited/${user.id}`)
				.then((res) => {
					setVisitedProducts(res.data);
				})
				.catch((error) => {
					onError(
						`Couldn't fetch watchlist, because of the error "${error.message}"`,
					);
				});
		}
	}, []);

	const vProducts: Product[] = [];
	visitedProducts.forEach((v) => {
		vProducts.unshift(products[v.product - 1]);
	});

	if (Array.isArray(vProducts) && vProducts.length > 0) {
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
	} else {
		return (
			<h2 className="py-1 text-white text-center">Your watchlist is empty!</h2>
		);
	}
};

export default WatchList;
