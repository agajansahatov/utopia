import Sidebar from "../components/Sidebar";
import { useOutletContext, useParams } from "react-router-dom";
import { ContextType } from "../App";
import Favourites from "../sections/Favourites";
import WatchList from "../sections/WatchList";
import OrderList from "../sections/OrderList";
import { AppLink } from "../interfaces/AppLink";

const sidebarLinks: AppLink[] = [
	{
		id: 0,
		label: "Orders",
		link: "orders",
	},
	{
		id: 1,
		label: "Favourites",
		link: "favourites",
	},
	{
		id: 2,
		label: "Watchlist",
		link: "watchlist",
	},
];

const History = () => {
	const { page } = useParams();
	const { products, favourites, onAddToCart, onLike } =
		useOutletContext<ContextType>();

	let content = -1;
	if (!page) {
		content = 0;
	}
	for (let i = 0; i < sidebarLinks.length; i++) {
		const link = sidebarLinks[i];
		if (link.label.toLocaleLowerCase() === page?.toLocaleLowerCase()) {
			content = link.id;
		}
	}

	if (content == -1) {
		throw new Error("Page not found!");
	}

	return (
		<>
			<Sidebar elements={sidebarLinks} root="/history/" active={content} />
			<main className="content">
				{content == 0 && <OrderList products={products} />}
				{content == 1 && (
					<Favourites
						products={products}
						favourites={favourites}
						onAddToCart={onAddToCart}
						onLike={onLike}
					/>
				)}
				{content == 2 && (
					<WatchList
						products={products}
						favourites={favourites}
						onAddToCart={onAddToCart}
						onLike={onLike}
					/>
				)}
			</main>
		</>
	);
};

export default History;
