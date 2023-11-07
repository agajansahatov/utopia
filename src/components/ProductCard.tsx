import Button from "react-bootstrap/Button";
import { Product } from "../interfaces/Product";
import { getProductImageURL } from "../config/Configuration";
import { Link } from "react-router-dom";
import Like from "./Like";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";

interface Props {
	product: Product;
	isLiked: boolean;
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart, onLike, isLiked }: Props) => {
	const user: User | null = useAuth();

	return (
		<div className="card">
			<img
				src={getProductImageURL(product.image)}
				className="card-img-top object-fit-contain px-3 pt-3"
				alt="Product image"
			/>
			<div className="card-body">
				<div className="d-flex align-items-center justify-content-between px-1">
					<h5 className="card-title">{product.name}</h5>
					<h5 className="text-light mt-2">${product.price}</h5>
				</div>
				<p className="card-text">
					{product.description.length > 50
						? product.description.slice(0, 50) + "..."
						: product.description}
				</p>
			</div>

			<div className="card-footer d-flex align-items-center justify-content-between m-0">
				{user && <Like status={isLiked} onToggle={() => onLike(product.id)} />}
				<span className="text-end">
					<Link to={"/product/" + product.id} className="btn btn-danger px-2">
						Learn More
					</Link>
					<Button
						className="px-2 m-1 me-0"
						variant="primary"
						onClick={() => onAddToCart(product)}
					>
						Add to cart
					</Button>
				</span>
			</div>
		</div>
	);
};

export default ProductCard;
