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

export interface ContextType {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
}

const App = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [favourites, setFavourites] = useState<Favourite[]>([]);
	const [shoppingCartList, setShoppingCartList] = useState<Product[]>([]);
	const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
	const [error, setError] = useState("");
	const user: User | null = useAuth();

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

	const onAddToCart = (product: Product) => {
		setShoppingCartList([product, ...shoppingCartList]);
	};

	const onClearShoppingCart = () => {
		setShoppingCartList([]);
	};

	const onLike = (productId: number) => {
		if (!user || user.id == null) return;

		const existsInFavourites: boolean = favourites.some(
			(fav) => fav.user === user.id && fav.product === productId
		);

		if (existsInFavourites) {
			// Remove fProduct from favourites array
			const newFavourites = favourites.filter(
				(fav) => !(fav.user === user.id && fav.product === productId)
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

	return (
		<>
			<NavbarTop links={getNavbarLinks()} />;
			<div className="main">
				{error && (
					<p
						className="text-danger text-center fw-bold position-absolute w-100 fs-3"
						style={{ top: "85px" }}>
						{error}!
					</p>
				)}
				<Outlet
					context={
						{
							products,
							favourites,
							onAddToCart,
							onLike,
						} satisfies ContextType
					}
				/>
			</div>
			{user && (
				<ShoppingCart
					onToggle={() => setShoppingCartVisible(!shoppingCartVisible)}
					visible={shoppingCartVisible}
					products={shoppingCartList}
					onClear={onClearShoppingCart}
				/>
			)}
		</>
	);
};

export default App;
