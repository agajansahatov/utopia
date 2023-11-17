import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { ContextType } from "../App";
import { AppLink } from "../interfaces/AppLink";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";

const sidebarLinks: AppLink[] = [
	{
		id: 0,
		label: "All Products",
		link: "?category=all",
	},
	{
		id: 1,
		label: "Clothes",
		link: "?category=clothes",
	},
	{
		id: 2,
		label: "Electronics",
		link: "?category=electronics",
	},
	{
		id: 3,
		label: "Furniture",
		link: "?category=furniture",
	},
	{
		id: 4,
		label: "Books",
		link: "?category=books",
	},
	{
		id: 5,
		label: "Fruits",
		link: "?category=fruits",
	},
];

const Home = () => {
	const {
		products,
		favourites,
		isSidebarVisible,
		isLoading,
		onAddToCart,
		onLike,
		onHideSidebar,
		onShowSidebar,
	} = useOutletContext<ContextType>();

	const [searchParams, setSearchParams] = useSearchParams();

	let category = 0;
	for (let i = 0; i < sidebarLinks.length; i++) {
		const element = sidebarLinks[i];
		if (
			element.label.toLocaleLowerCase() ===
			searchParams.get("category")?.toLocaleLowerCase()
		) {
			category = element.id;
		}
	}

	const productList =
		category == 0
			? products
			: products.filter(
					(product) =>
						product.category === sidebarLinks[category].label.toLowerCase(),
			  );

	return (
		<>
			<NavbarTop links={getNavbarLinks()} onShowSidebar={onShowSidebar} />

			<Sidebar
				isVisible={isSidebarVisible}
				onHide={onHideSidebar}
				elements={sidebarLinks}
				active={category}
			/>

			<main className="wrapper-fixed overflow-auto position-fixed top-0">
				<ProductList
					products={productList}
					favourites={favourites}
					isLoading={isLoading}
					onAddToCart={(product) => onAddToCart(product)}
					onLike={onLike}
				/>
			</main>
		</>
	);
};

export default Home;
