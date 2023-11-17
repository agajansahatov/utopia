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
	const { onError, isLoading, error } = useOutletContext<ContextType>();
	const [visitedProducts, setVisitedProducts] = useState<Visited[]>([]);
	const [isVisitedLoading, setIsVisitedLoading] = useState(false);

	useEffect(() => {
		if (user) {
			setIsVisitedLoading(true);
			axios
				.get(`${getBaseURL()}visited/${user.id}`)
				.then((res) => {
					setVisitedProducts(res.data);
					setIsVisitedLoading(false);
				})
				.catch((error) => {
					onError(
						`Couldn't fetch watchlist, because of the error "${error.message}"`,
					);
					setIsVisitedLoading(false);
				});
		}
	}, []);

	const vProducts: Product[] = [];
	visitedProducts.forEach((v) => {
		const product = products.find((product) => product.id === v.product);
		if (product) {
			vProducts.unshift({ ...product });
		}
	});

	if (vProducts.length == 0 && !error && !isLoading && !isVisitedLoading) {
		return (
			<h2 className="py-1 text-white text-center">Your watchlist is empty!</h2>
		);
	}

	return (
		<>
			<h1 className="m-0 p-0 mb-2 text-white text-center">WatchList</h1>
			<ProductList
				products={vProducts}
				favourites={favourites}
				isLoading={isLoading || isVisitedLoading}
				onAddToCart={(product) => onAddToCart(product)}
				onLike={onLike}
			/>
		</>
	);
};

export default WatchList;
