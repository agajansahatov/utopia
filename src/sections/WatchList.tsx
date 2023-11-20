import { Trace } from "../interfaces/Trace";
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
	const { isLoading, error, traces } = useOutletContext<ContextType>();

	// Sorting the data in asc order
	const sortedTraces: Trace[] = traces ? [...traces] : [];
	sortedTraces.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	const watchlist: Product[] = [];
	sortedTraces.forEach((trace: Trace) => {
		const product = products.find((product) => product.id === trace.productId);
		if (product) {
			watchlist.push({ ...product });
		}
	});

	if (watchlist.length == 0 && !error && !isLoading) {
		return (
			<h2 className="py-1 text-white text-center">Your watchlist is empty!</h2>
		);
	}

	return (
		<>
			<h1 className="m-0 p-0 mb-2 text-white text-center">WatchList</h1>
			<ProductList
				products={watchlist}
				favourites={favourites}
				isLoading={isLoading}
				onAddToCart={(product) => onAddToCart(product)}
				onLike={onLike}
			/>
		</>
	);
};

export default WatchList;
