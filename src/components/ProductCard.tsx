import Button from "react-bootstrap/Button";
import { Product } from "../interfaces/Product";
import { getProductImageURL } from "../config/Configuration";

interface Props {
	product: Product;
	onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
	return (
		<div className="card mb-4" style={{ width: "23rem" }}>
			<img
				src={getProductImageURL(product.image)}
				className="card-img-top object-fit-contain"
				alt="Product image"
			/>
			<div className="card-body">
				<h5 className="card-title">{product.name}</h5>
				<p className="card-text">{product.description}</p>
				<div className="d-flex align-items-center justify-content-between">
					<p className="text-light mt-2">${product.price}</p>
					<Button variant="primary" onClick={() => onAddToCart(product)}>
						Add to cart
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
