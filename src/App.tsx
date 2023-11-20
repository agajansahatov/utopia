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
import { Trace } from "./interfaces/Trace";

export interface ContextType {
	products: Product[];
	favourites: Favourite[];
	traces: Trace[] | null;
	error: string;
	isSidebarVisible: boolean;
	isLoading: boolean;
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
	onHideSidebar: () => void;
	onShowSidebar: () => void;
	onError: (msg: string) => void;
	onSuccess: (msg: string) => void;
	onSetTraces: (traces: Trace[]) => void;
}

const App = () => {
	const user: User | null = useAuth();
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [favourites, setFavourites] = useState<Favourite[]>([]);
	const [traces, setTraces] = useState<Trace[] | null>(null);
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
			(order) => order.productId === product.id,
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
				userId: user.id,
				productId: product.id,
				quantity: 1,
				destination: user.address,
				status: "Pending",
				date: getDate(new Date().toISOString()),
				image: product.imageName,
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

		let currentFavourite: Favourite;
		const existsInFavourites = favourites.some((fav) => {
			const isMatch = fav.userId === user.id && fav.productId === productId;
			if (isMatch) {
				currentFavourite = fav;
			}
			return isMatch;
		});

		if (existsInFavourites) {
			// Remove fProduct from favourites array
			const newFavourites = favourites.filter(
				(fav) => !(fav.userId === user.id && fav.productId === productId),
			);
			setFavourites(newFavourites);

			//Call backend to delete it from the database
			axios
				.delete(`${getBaseURL()}/favourites`, {
					data: {
						userId: user.id,
						productId: productId,
					},
				})
				.catch((error) => {
					// Add fProduct to favourites array
					const newFavourites = [...favourites, currentFavourite];
					setFavourites(newFavourites);
					setError(`Couldn't remove like, because of "${error}"`);
				});
		} else {
			// Add fProduct to favourites array
			const newFavourites = [
				...favourites,
				{
					userId: user.id,
					productId: productId,
					date: new Date().toISOString(),
				},
			];
			setFavourites(newFavourites);

			axios
				.post(`${getBaseURL()}/favourites`, {
					userId: user.id,
					productId: productId,
				})
				.catch((error) => {
					// Remove fProduct from favourites array
					const newFavourites = favourites.filter(
						(fav) => !(fav.userId === user.id && fav.productId === productId),
					);
					setFavourites(newFavourites);
					setError(`Couldn't put like, because of "${error}"`);
				});
		}
	};

	useEffect(() => {
		if (products.length == 0) {
			setIsLoading(true);
			axios
				.get(`${getBaseURL()}/products`)
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				})
				.catch((error) => {
					setError(
						`Couldn't fetch products, because of the error "${error.message}"`,
					);
					setIsLoading(false);
				});
		}

		if (!user) return;

		if (favourites.length == 0) {
			axios
				.get(`${getBaseURL()}/favourites/${user.id}`)
				.then((res) => {
					setFavourites(res.data);
				})
				.catch((error) => {
					setError(
						`Couldn't fetch favourites list, because of the error "${error.message}"`,
					);
				});
		}

		if (!traces || traces.length == 0) {
			axios
				.get(`${getBaseURL()}/traces/${user.id}`)
				.then((res) => {
					setTraces(res.data);
				})
				.catch((error) => {
					setError(
						`Couldn't fetch watchlist, because of the error "${error.message}"`,
					);
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
						traces,
						error,
						onAddToCart,
						onError: setError,
						onHideSidebar: () => setIsSidebarVisible(false),
						onLike,
						isSidebarVisible,
						isLoading,
						onShowSidebar: () => setIsSidebarVisible(true),
						onSuccess: setSuccess,
						onSetTraces: setTraces,
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
