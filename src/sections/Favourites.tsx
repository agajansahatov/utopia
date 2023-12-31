import ProductList from "../components/ProductList";
import { Product } from "../interfaces/Product";
import { Favourite } from "../interfaces/Favourite";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

interface Props {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}
const Favourites = ({ products, favourites, onAddToCart, onLike }: Props) => {
	const { isLoading, error } = useOutletContext<ContextType>();

	// Sorting the data in asc order
	const sortedFavourites: Favourite[] = [...favourites];
	sortedFavourites.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	const favouriteProducts: Product[] = [];
	sortedFavourites.forEach((f) => {
		const product = products.find((product) => product.id === f.productId);
		if (product) {
			favouriteProducts.unshift({ ...product });
		}
	});

	if (favouriteProducts.length == 0 && !error && !isLoading) {
		return (
			<h2 className="py-1 text-white text-center">
				You don't have any favourite products!
			</h2>
		);
	}

	return (
		<>
			<h1 className="m-0 p-0 mb-2 text-white text-center">Favourites</h1>
			<ProductList
				products={favouriteProducts}
				favourites={favourites}
				isLoading={isLoading}
				onAddToCart={(product) => onAddToCart(product)}
				onLike={onLike}
			/>
		</>
	);
};

export default Favourites;
