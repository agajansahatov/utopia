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
		<div className="row w-100 p-0 m-0">
			{products.map((product) => (
				<div
					key={product.id}
					className="col-12 col-md-6 col-xl-4 d-flex justify-content-center"
				>
					<ProductCard
						product={product}
						onAddToCart={(product) => onAddToCart(product)}
						onLike={onLike}
						isLiked={favourites.some((fav) => fav.product === product.id)}
					/>
				</div>
			))}
		</div>
	);
};

export default ProductList;
