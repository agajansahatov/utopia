import { Product } from "../interfaces/Product";
import ProductCard from "./ProductCard";

interface Props {
	products: Product[];
	onAddToCart: (product: Product) => void;
}

const ProductList = ({ products, onAddToCart }: Props) => {
	if (products.length == 0)
		return (
			<p className="text-danger">
				Couln't get the products list from the database
			</p>
		);
	return (
		<div className="products-list-field">
			{products.map((product) => (
				<ProductCard
					product={product}
					key={product.id}
					onAddToCart={(product) => onAddToCart(product)}
				/>
			))}
		</div>
	);
};

export default ProductList;
