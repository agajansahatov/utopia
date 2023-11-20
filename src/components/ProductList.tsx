import { Favourite } from "../interfaces/Favourite";
import { Product } from "../interfaces/Product";
import LoadingSkeleton from "./LoadingSkeleton";
import ProductCard from "./ProductCard";

interface Props {
	products: Product[];
	favourites: Favourite[];
	isLoading: boolean;
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const ProductList = ({
	products,
	favourites,
	isLoading,
	onAddToCart,
	onLike,
}: Props) => {
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	if (products.length == 0 && isLoading == true) {
		return (
			<div className="row w-100 p-0 m-0">
				{skeletons.map((skeleton) => (
					<div
						key={skeleton}
						className="col-12 col-md-6 col-xl-4 d-flex justify-content-center"
					>
						<LoadingSkeleton />
					</div>
				))}
			</div>
		);
	} else if (products.length == 0 && isLoading == false) {
		return <h3 className="text-center py-3">Products list is empty.</h3>;
	} else {
		return (
			<div className="row w-100 p-0 m-0">
				{products.map((product, index) => (
					<div
						key={index}
						className="col-12 col-md-6 col-xl-4 d-flex justify-content-center"
					>
						<ProductCard
							product={product}
							onAddToCart={(product) => onAddToCart(product)}
							onLike={onLike}
							isLiked={favourites.some((fav) => fav.productId === product.id)}
						/>
					</div>
				))}
			</div>
		);
	}
};

export default ProductList;
