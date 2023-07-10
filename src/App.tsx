import { getNavbarLinks } from "./config/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ShoppingCart from "./components/ShoppingCart";
import useAuth from "./hooks/useAuth";

const App = () => {
	const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
	const user = useAuth();

	return (
		<>
			<NavbarTop links={getNavbarLinks()} />;
			<div className="main">
				<Outlet />
			</div>
			{user && (
				<ShoppingCart
					onToggle={() => setShoppingCartVisible(!shoppingCartVisible)}
					visible={shoppingCartVisible}
				/>
			)}
		</>
	);
};

export default App;
