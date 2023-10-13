import { Favourite } from "../interfaces/Favourite";
import { Product } from "../interfaces/Product";
import ProductCard from "./ProductCard";

interface Props {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const ProductList = ({ products, favourites, onAddToCart, onLike }: Props) => {
	if (products.length == 0) return;

	return (
		<div className="products-list-field">
			{products.map((product) => (
				<ProductCard
					product={product}
					key={product.id}
					onAddToCart={(product) => onAddToCart(product)}
					onLike={onLike}
					isLiked={favourites.some((fav) => fav.product === product.id)}
				/>
			))}
		</div>
	);
};

export default ProductList;
