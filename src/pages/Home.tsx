import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import { IProduct } from "../components/Product";
import axios from "axios";

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
		label: "Fruits",
	},
	{
		id: 4,
		label: "Cars",
	},
];

const Home = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [error, setError] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:8080/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	const onFilter = () => {};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={() => onFilter} />;
			<main className="content">
				<p className="text-danger">{error}</p>
				<ProductList products={products} />
			</main>
		</>
	);
};

export default Home;
