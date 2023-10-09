import Button from "react-bootstrap/Button";
import { Product } from "../interfaces/Product";
import { getProductImageURL } from "../config/Configuration";
import { Link, Navigate } from "react-router-dom";
import Like from "./Like";
import { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";

interface Props {
	product: Product;
	onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
	const [isLiked, setIsLiked] = useState(false);

	const user: User | null = useAuth();

	const onLike = (productId: number) => {
		if (!user) return;

		setIsLiked(!isLiked);
		if (isLiked == false) {
			axios.post(getBaseURL() + "favourites", {
				user: user.id,
				product: productId,
			});
		} else {
			axios.delete(getBaseURL() + "favourites", {
				data: {
					user: user.id,
					product: productId,
				},
			});
		}
	};

	return (
		<div className="card mb-4 pt-3" style={{ width: "23rem" }}>
			<img
				src={getProductImageURL(product.image)}
				className="card-img-top object-fit-contain px-3"
				alt="Product image"
			/>
			<div className="card-body">
				<div className="d-flex align-items-center justify-content-between px-1">
					<h5 className="card-title">{product.name}</h5>
					<h5 className="text-light mt-2">${product.price}</h5>
				</div>
				<p className="card-text">{product.description}</p>
				<div className="d-flex align-items-center justify-content-between">
					{user && (
						<Like status={isLiked} onToggle={() => onLike(product.id)} />
					)}
					<span>
						<Link to="product/5" className="btn btn-danger me-2">
							Learn More
						</Link>
						<Button variant="primary" onClick={() => onAddToCart(product)}>
							Add to cart
						</Button>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
