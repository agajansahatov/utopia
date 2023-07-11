import { getNavbarLinks } from "./config/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoppingCart from "./components/ShoppingCart";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import { Product } from "./interfaces/Product";

export interface ContextType {
	onAddToCart: (product: Product) => void;
	products: Product[];
}

const App = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [shoppingCartList, setShoppingCartList] = useState<Product[]>([]);
	const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
	const [error, setError] = useState("");
	const user = useAuth();

	useEffect(() => {
		axios
			.get("http://192.168.31.8:8080/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	const onAddToCart = (product: Product) => {
		setShoppingCartList([product, ...shoppingCartList]);
	};

	const onClearShoppingCart = () => {
		setShoppingCartList([]);
	};

	return (
		<>
			<NavbarTop links={getNavbarLinks()} />;
			<div className="main">
				<p className="text-danger">{error}</p>
				<Outlet context={{ onAddToCart, products } satisfies ContextType} />
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
