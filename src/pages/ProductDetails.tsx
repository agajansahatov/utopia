import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import { Product } from "../interfaces/Product";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";
import NavbarBottom from "../components/NavbarBottom";

const ProductDetails = () => {
	const { productId } = useParams();
	const [id, setId] = useState(-1);
	const [error, setError] = useState("");
	const [product, setProduct] = useState<Product>();
	const user: User | null = useAuth();

	useEffect(() => {
		if (id !== Number(productId)) {
			setId(Number(productId));
		}
	}, [productId]);

	useEffect(() => {
		if (id !== -1) {
			axios
				.get(`${getBaseURL()}products/${id}`)
				.then((res) => {
					setProduct(res.data);

					if (user !== null) {
						axios.post(getBaseURL() + "visited", {
							user: user.id,
							product: productId,
						});
					}
				})
				.catch((error) => {
					setError(error.message);
				});
		}
	}, [id]);

	return (
		<>
			<NavbarTop links={getNavbarLinks()} isFullWidth={true} />

			<main className="wrapper">
				<span className="d-flex align-items-center justify-content-center pt-3">
					<Link
						to="/"
						className="btn btn-primary"
						style={{ position: "absolute", left: "15px" }}
					>
						Go Back
					</Link>
					<h3>ProductInfo of {product && product.id}</h3>
				</span>

				<div className="d-flex justify-content-center mt-2">
					{product && product.name}
				</div>
			</main>

			<NavbarBottom />
		</>
	);
};

export default ProductDetails;
