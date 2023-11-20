import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL, getProductImageURL } from "../config/Configuration";
import { Product } from "../interfaces/Product";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";
import NavbarBottom from "../components/NavbarBottom";
import { Button, Spinner } from "react-bootstrap";
import { ContextType } from "../App";
import Like from "../components/Like";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { TbClover } from "react-icons/tb";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Error404 from "./Error404";
import { Trace } from "../interfaces/Trace";

const ProductDetails = () => {
	const { favourites, traces, onAddToCart, onLike, onError, onSetTraces } =
		useOutletContext<ContextType>();
	const user: User | null = useAuth();
	const { productId } = useParams();
	const [id, setId] = useState(-1);
	const [product, setProduct] = useState<Product>();
	const [isDescriptionFull, setIsDescriptionFull] = useState(false);
	const [likedCount, setLikedCount] = useState(0);
	const [visitedCount, setVisitedCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [is404, setIs404] = useState(false);

	useEffect(() => {
		if (id !== Number(productId)) {
			setId(Number(productId));
		}
	}, [productId]);

	useEffect(() => {
		if (id !== -1) {
			setIsLoading(true);

			axios
				.get(`${getBaseURL()}/products/${id}`)
				.then((res) => {
					setProduct(res.data);
					if (traces == undefined || traces == null) return;

					if (user !== null && user.id !== null) {
						const exists = traces.some(
							(trace) => trace.userId === user.id && trace.productId === id,
						);

						if (exists) {
							axios
								.put(`${getBaseURL()}/traces`, {
									userId: user.id,
									productId: productId,
								})
								.then((res) => {
									const data: Trace = res.data;
									const newTraces = traces.map((trace) => {
										if (
											trace.userId === data.userId &&
											trace.productId === data.productId
										) {
											return { ...trace, value: data };
										}
										return trace;
									});

									onSetTraces([...newTraces]);
								})
								.catch((error) => {
									onError(`Couldn't toggle watchlist, because of "${error}"`);
								});
						} else {
							axios
								.post(`${getBaseURL()}/traces`, {
									userId: user.id,
									productId: productId,
								})
								.then((res) => {
									const data: Trace = res.data;
									onSetTraces([...traces, { ...data }]);
									setVisitedCount(visitedCount + 1);
								})
								.catch((error) => {
									// if (error.response && error.response.status == 409) {
									// 	const newTraces = [
									// 		...traces,
									// 		{
									// 			userId: Number(user.id),
									// 			productId:
									// 				productId !== undefined
									// 					? Number(productId)
									// 					: undefined,
									// 			date: new Date().toISOString(),
									// 		} as Trace,
									// 	];

									// 	onSetTraces(newTraces);
									// 	setVisitedCount(visitedCount + 1);
									// 	return;
									// }
									onError(`Couldn't add to watchlist, because of "${error}"`);
								});
						}
					}

					setIsLoading(false);
				})
				.catch((error) => {
					if (error.response && error.response.status === 404) {
						setIs404(true);
					} else {
						onError(`Couldn't fetch product details: ${error.message}`);
					}

					setIsLoading(false);
				});

			axios
				.get(`${getBaseURL()}/favourites/count/${id}`)
				.then((res) => {
					setLikedCount(res.data);
				})
				.catch((error) => {
					onError(`Couldn't fetch number of likes: ${error.message}`);
				});

			axios
				.get(`${getBaseURL()}/traces/count/${id}`)
				.then((res) => {
					setVisitedCount(res.data);
				})
				.catch((error) => {
					onError(`Couldn't fetch count of visits: ${error.message}`);
				});
		}
	}, [id]);

	if (!product) {
		if (is404) {
			return (
				<Error404
					message="This product is not found in our store!"
					type={404}
				/>
			);
		}

		return (
			<>
				<NavbarTop links={getNavbarLinks()} isFullWidth={true} />
				{isLoading && (
					<main className="wrapper text-center">
						<Spinner
							animation="border"
							className="my-5"
							style={{ width: 50, height: 50 }}
						/>
					</main>
				)}
				<NavbarBottom />
			</>
		);
	}

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

	const isLiked = favourites.some((fav) => fav.productId === product.id);
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
								src={getProductImageURL(product.imageName)}
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
