import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import Favourites from "../sections/Favourites";
import WatchList from "../sections/WatchList";
import OrderList from "../sections/OrderList";

const sidebarLinks = [
	{
		id: 0,
		label: "Orders",
	},
	{
		id: 1,
		label: "Favourites",
	},
	{
		id: 2,
		label: "Watchlist",
	},
];

const History = () => {
	const [content, setContent] = useState(0);
	const { products, favourites, onAddToCart, onLike } =
		useOutletContext<ContextType>();

	const onContentChange = (id: number) => {
		setContent(id);
	};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
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
				{content == 2 && <WatchList />}
			</main>
		</>
	);
};

export default History;
