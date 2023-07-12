import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

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
		label: "Drinks",
	},
	{
		id: 5,
		label: "Books",
	},
	{
		id: 6,
		label: "Fruits",
	},
];

const Home = () => {
	const { onAddToCart, products } = useOutletContext<ContextType>();

	const onFilter = () => {};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={() => onFilter} />;
			<main className="content">
				<ProductList
					products={products}
					onAddToCart={(product) => onAddToCart(product)}
				/>
			</main>
		</>
	);
};

export default Home;
