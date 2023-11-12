import {
	Link,
	useParams,
	useNavigate,
	useLocation,
	useOutletContext,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL, getProductImageURL } from "../config/Configuration";
import { Product } from "../interfaces/Product";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";
import NavbarBottom from "../components/NavbarBottom";
import { Button } from "react-bootstrap";
import { ContextType } from "../App";
import Like from "../components/Like";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { TbClover } from "react-icons/tb";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const ProductDetails = () => {
	const { onAddToCart, onLike, favourites } = useOutletContext<ContextType>();
	const { productId } = useParams();
	const user: User | null = useAuth();
	const [id, setId] = useState(-1);
	const [error, setError] = useState("");
	const [product, setProduct] = useState<Product>();
	const [isDescriptionFull, setIsDescriptionFull] = useState(false);
	const [likedCount, setLikedCount] = useState(0);
	const [visitedCount, setVisitedCount] = useState(0);

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

			axios
				.get(`${getBaseURL()}favourites/count/${id}`)
				.then((res) => {
					setLikedCount(res.data);
				})
				.catch((error) => {
					setError(error.message);
				});
			axios
				.get(`${getBaseURL()}visited/count/${id}`)
				.then((res) => {
					setVisitedCount(res.data);
				})
				.catch((error) => {
					setError(error.message);
				});
		}
	}, [id]);

	if (!product) return;

	const defaultDescLength = 250;
	const descriptionLength = isDescriptionFull
		? product.description.length
		: defaultDescLength;
	const isTogglerVisible =
		product.description.length > defaultDescLength ? true : false;

	let description = product.description;
	if (product.description.length > descriptionLength) {
		description = product.description.substring(0, descriptionLength);
	}

	const isLiked = favourites.some((fav) => fav.product === product.id);
	const handleLike = () => {
		if (isLiked) {
			setLikedCount(likedCount - 1);
		} else {
			setLikedCount(likedCount + 1);
		}
		onLike(product.id);
	};

	return (
		<>
			<NavbarTop links={getNavbarLinks()} isFullWidth={true} />

			<main className="wrapper">
				<div className="product-details py-5 pt-3 pt-sm-5">
					<div className="row">
						<div className="col-12 col-sm-6 overflow-hidden p-3 d-flex align-items-center bg-body-tertiary">
							<img
								src={getProductImageURL(product.image)}
								alt="Product Image"
								className="product-details__image object-fit-contain"
							/>
						</div>
						<div className="col-12 col-sm-6 d-flex flex-column justify-content-between align-items-center">
							<div className="w-100">
								<h1 className="h3 pb-1 pt-3 pt-sm-0 text-center">
									{product.name}
								</h1>
								<div className="text-center pb-4">
									<p className="text-center">
										{description}{" "}
										{isTogglerVisible && !isDescriptionFull && <TfiMoreAlt />}
									</p>
									{isTogglerVisible &&
										(isDescriptionFull ? (
											<Button
												onClick={() => setIsDescriptionFull(false)}
												variant="outline-secondary"
												className="btn-sm"
											>
												Show Less <AiFillCaretUp />
											</Button>
										) : (
											<span>
												<Button
													onClick={() => setIsDescriptionFull(true)}
													variant="outline-secondary"
													className="btn-sm"
												>
													Show More <AiFillCaretDown />
												</Button>
											</span>
										))}
								</div>
							</div>
							<div className="w-100">
								<div className="d-flex justify-content-between border-top border-2 pt-1">
									<div className="d-flex flex-column justify-content-between align-items-center text-center">
										<span className="d-flex justify-content-center align-items center">
											<TbClover size="25" />
											<p className="d-inline text-white ps-1">{likedCount}</p>
										</span>
										{user && (
											<Like status={isLiked} onToggle={() => handleLike()} />
										)}
									</div>
									<div className="d-flex flex-column justify-content-between align-items-center text-center">
										<span className="d-flex justify-content-center align-items center">
											<BsEyeFill size="25" />
											<p className="d-inline text-white ps-1">{visitedCount}</p>
										</span>
										<div className="fs-5 text-white m-0 pb-1">
											${product.price}
										</div>
									</div>

									<div className="d-flex flex-column justify-content-between align-items-end text-center">
										<span className="d-flex justify-content-center align-items center">
											<BiSolidCategoryAlt size="25" />
											<p className="d-inline text-white ps-1">
												{product.category}
											</p>
										</span>
										<Button
											className="btn-sm px-2 m-1 me-0"
											variant="primary"
											onClick={() => onAddToCart(product)}
										>
											Add to cart
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<NavbarBottom />
		</>
	);
};

export default ProductDetails;
