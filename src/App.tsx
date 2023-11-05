import { getNavbarLinks } from "./config/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
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
export interface ContextType {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
	isSidebarVisible: boolean;
	onHideSidebar: () => void;
}

const App = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [favourites, setFavourites] = useState<Favourite[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
	const [error, setError] = useState("");
	const user: User | null = useAuth();

	const onAddToCart = (product: Product) => {
		if (!user) return;
		// Check if the product's id already exists in orders
		const orderIndex = orders.findIndex(
			(order) => order.product === product.id,
		);

		if (orderIndex !== -1) {
			const updatedOrders = [...orders];
			updatedOrders[orderIndex].quantity += 1;
			setOrders(updatedOrders);
		} else {
			if (!user.id || !user.address) return;
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

	const onClearShoppingCart = () => {
		setOrders([]);
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

	const onHideSidebar = () => setIsSidebarVisible(false);

	useEffect(() => {
		if (products.length == 0) {
			axios
				.get(getBaseURL() + "products")
				.then((res) => {
					setProducts(res.data);
				})
				.catch((error) => {
					setError(error.message);
				});
		}

		if (!user) return;
		if (favourites.length == 0) {
			axios
				.get(`${getBaseURL()}favourites/${user.id}`)
				.then((res) => {
					setFavourites(res.data);
				})
				.catch((error) => {
					setError(error.message);
				});
		}
	}, []);

	return (
		<div className="d-flex" id="container">
			<header id="navbar-top" className="position-fixed z-3">
				<NavbarTop
					links={getNavbarLinks()}
					onShowSidebar={() => setIsSidebarVisible(true)}
				/>
			</header>

			<main>
				<Outlet
					context={
						{
							products,
							favourites,
							onAddToCart,
							onLike,
							isSidebarVisible,
							onHideSidebar,
						} satisfies ContextType
					}
				/>

				{user && (
					<ShoppingCart
						orders={orders}
						visible={shoppingCartVisible}
						onToggle={() => setShoppingCartVisible(!shoppingCartVisible)}
						onClear={onClearShoppingCart}
						onAdd={OnIncreaseOrderQuantity}
						onDelete={OnDecreaseOrderQuantity}
					/>
				)}
			</main>
		</div>
	);
};

export default App;
