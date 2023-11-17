import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoppingCart from "./components/ShoppingCart";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import { Product } from "./interfaces/Product";
import { getBaseURL } from "./config/Configuration";
import { Favourite } from "./interfaces/Favourite";
import { User } from "./interfaces/User";
import { Order } from "./interfaces/Order";
import { getDate } from "./utilities/Date";
import Toaster from "./components/Toaster";
import Agreement from "./components/Agreement";

export interface ContextType {
	products: Product[];
	favourites: Favourite[];
	error: string;
	isSidebarVisible: boolean;
	isLoading: boolean;
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
	onHideSidebar: () => void;
	onShowSidebar: () => void;
	onError: (msg: string) => void;
	onSuccess: (msg: string) => void;
}

const App = () => {
	const user: User | null = useAuth();
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [favourites, setFavourites] = useState<Favourite[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isToasterVisible, setIsToasterVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onAddToCart = (product: Product) => {
		if (!user) {
			window.location.pathname = "/login";
			return;
		}
		// Check if the product's id already exists in orders
		const orderIndex = orders.findIndex(
			(order) => order.product === product.id,
		);

		if (orderIndex !== -1) {
			const updatedOrders = [...orders];
			updatedOrders[orderIndex].quantity += 1;
			setOrders(updatedOrders);
		} else {
			if (!user.id || !user.address) {
				console.log("No user info");
				window.location.pathname = "/login";
				return;
			}
			const newOrder: Order = {
				user: user.id,
				product: product.id,
				quantity: 1,
				destination: user.address,
				status: "Pending",
				date: getDate(),
				image: product.image,
				name: product.name,
				price: product.price,
			};
			setOrders([...orders, newOrder]);
		}
	};

	const OnIncreaseOrderQuantity = (orderIndex: number) => {
		if (orderIndex >= 0 && orderIndex < orders.length) {
			const updatedOrders = [...orders];
			updatedOrders[orderIndex].quantity += 1;
			setOrders(updatedOrders);
		}
	};

	const OnDecreaseOrderQuantity = (orderIndex: number) => {
		if (orderIndex >= 0 && orderIndex < orders.length) {
			const updatedOrders = [...orders];
			if (updatedOrders[orderIndex].quantity > 1) {
				updatedOrders[orderIndex].quantity -= 1;
				setOrders(updatedOrders);
			} else {
				// If quantity is 1, you may want to remove the order from the list
				updatedOrders.splice(orderIndex, 1);
				setOrders(updatedOrders);
			}
		}
	};

	const onLike = (productId: number) => {
		if (!user || user.id == null) return;

		const existsInFavourites: boolean = favourites.some(
			(fav) => fav.user === user.id && fav.product === productId,
		);

		if (existsInFavourites) {
			// Remove fProduct from favourites array
			const newFavourites = favourites.filter(
				(fav) => !(fav.user === user.id && fav.product === productId),
			);
			setFavourites(newFavourites);

			//Call backend to delete it from the database
			axios.delete(getBaseURL() + "favourites", {
				data: {
					user: user.id,
					product: productId,
				},
			});
		} else {
			// Add fProduct to favourites array
			const newFavourites = [
				...favourites,
				{ user: user.id, product: productId },
			];
			setFavourites(newFavourites);

			//Call the backend for adding it to the database
			axios.post(getBaseURL() + "favourites", {
				user: user.id,
				product: productId,
			});
		}
	};

	useEffect(() => {
		if (products.length == 0) {
			setIsLoading(true);
			axios
				.get(getBaseURL() + "products")
				.then((res) => {
					setProducts(res.data);

					if (!user) {
						setIsLoading(false);
						return;
					}
					if (favourites.length == 0) {
						axios
							.get(`${getBaseURL()}favourites/${user.id}`)
							.then((res) => {
								setFavourites(res.data);
								setIsLoading(false);
							})
							.catch((error) => {
								setError(
									`Couldn't fetch favourites list, because of the error "${error.message}"`,
								);
								setIsLoading(false);
							});
					}
				})
				.catch((error) => {
					setError(
						`Couldn't fetch products, because of the error "${error.message}"`,
					);
					setIsLoading(false);
				});
		}
	}, []);

	useEffect(() => {
		if (error || success) {
			setIsToasterVisible(true);
		}
	}, [error, success]);

	return (
		<>
			<Outlet
				context={
					{
						products,
						favourites,
						error,
						onAddToCart,
						onError: setError,
						onHideSidebar: () => setIsSidebarVisible(false),
						onLike,
						isSidebarVisible,
						isLoading,
						onShowSidebar: () => setIsSidebarVisible(true),
						onSuccess: setSuccess,
					} satisfies ContextType
				}
			/>

			{user && (
				<ShoppingCart
					orders={orders}
					visible={shoppingCartVisible}
					onToggle={() => setShoppingCartVisible(!shoppingCartVisible)}
					onClear={() => setOrders([])}
					onAdd={OnIncreaseOrderQuantity}
					onDelete={OnDecreaseOrderQuantity}
					onError={setError}
					onSuccess={setSuccess}
				/>
			)}

			<Toaster
				isVisible={isToasterVisible}
				onClose={() => setIsToasterVisible(false)}
				message={error || success}
				type={error ? "error" : success ? "success" : null}
			/>

			<Agreement />
		</>
	);
};

export default App;
