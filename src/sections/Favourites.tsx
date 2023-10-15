import ProductList from "../components/ProductList";
import { Product } from "../interfaces/Product";
import { Favourite } from "../interfaces/Favourite";

interface Props {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}
const Favourites = ({ products, favourites, onAddToCart, onLike }: Props) => {
	const favouriteProducts: Product[] = [];
	favourites.forEach((f) => {
		favouriteProducts.unshift(products[f.product - 1]);
	});

	return (
		<>
			<h1 className="m-0 p-0 mb-2 text-white text-center">Favourites</h1>
			<ProductList
				products={favouriteProducts}
				favourites={favourites}
				onAddToCart={(product) => onAddToCart(product)}
				onLike={onLike}
			/>
		</>
	);
};

export default Favourites;
