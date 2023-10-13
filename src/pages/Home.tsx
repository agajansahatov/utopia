import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { useState } from "react";

const sidebarLinks = [
	{
		id: 0,
		label: "All Products",
	},
	{
		id: 1,
		label: "Clothes",
	},
	{
		id: 2,
		label: "Electronics",
	},
	{
		id: 3,
		label: "Furniture",
	},
	{
		id: 4,
		label: "Books",
	},
	{
		id: 5,
		label: "Fruits",
	},
];

const Home = () => {
	const [selectedCategory, setSelectedCategory] = useState(0);
	const { products, favourites, onAddToCart, onLike } =
		useOutletContext<ContextType>();

	const productList =
		selectedCategory == 0
			? products
			: products.filter(
					(product) =>
						product.category ===
						sidebarLinks[selectedCategory].label.toLowerCase()
			  );

	return (
		<>
			<Sidebar
				elements={sidebarLinks}
				onClick={(sidebarLinkId) => setSelectedCategory(sidebarLinkId)}
			/>
			;
			<main className="content">
				<ProductList
					products={productList}
					favourites={favourites}
					onAddToCart={(product) => onAddToCart(product)}
					onLike={onLike}
				/>
			</main>
		</>
	);
};

export default Home;
