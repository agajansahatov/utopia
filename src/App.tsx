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
import Sidebar from "./components/Sidebar";
import { Button } from "react-bootstrap";

export interface ContextType {
	products: Product[];
	favourites: Favourite[];
	onAddToCart: (product: Product) => void;
	onLike: (productId: number) => void;
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
		<>
			<div className="d-flex" id="container">
				<aside id="sidebar">
					<Sidebar
						isVisible={isSidebarVisible}
						onHide={() => setIsSidebarVisible(false)}
					/>
				</aside>

				<main id="wrapper">
					<header className="sticky-top" id="navbar">
						<NavbarTop
							links={getNavbarLinks()}
							onShowSidebar={() => setIsSidebarVisible(true)}
						/>
					</header>

					<section className="p-2" id="content">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae porro
						illo cumque quae commodi dolor, minima odio ipsam nulla tenetur,
						saepe beatae rem nisi consequatur. Eligendi aut unde, perspiciatis
						eos animi, commodi, officia quos nam numquam maxime ullam voluptas
						eius? Molestias, quaerat ea? Nobis quod accusantium reiciendis,
						porro magnam, sapiente aliquam cupiditate placeat et illo
						perferendis consequuntur cumque illum assumenda praesentium hic
						incidunt maiores voluptatibus amet veniam? Suscipit reiciendis
						quibusdam temporibus, recusandae eum ducimus officia dolorum
						mollitia, praesentium consequuntur totam possimus harum ex corporis!
						Explicabo accusamus inventore sapiente maxime aspernatur facere
						tempora id eos, corrupti minus odio eius sint quae laborum,
						voluptatibus error, iusto at voluptates necessitatibus assumenda
						aliquam tempore architecto temporibus nostrum? Fuga quia aliquam sed
						corrupti. Quas fugiat recusandae voluptatem nihil iusto, molestias
						maiores ea temporibus. Odit aspernatur laudantium tempora rerum odio
						eius minima quam sit voluptatum maxime perferendis eveniet fuga
						impedit provident nihil aliquid, repellat molestiae atque fugit quod
						doloribus. Commodi beatae velit, natus debitis fugit quia. Nulla
						expedita rem quaerat necessitatibus tenetur earum architecto,
						corrupti nihil ipsam repellat officiis autem alias a eaque qui. Sed
						sint culpa, vero nostrum ex eos aspernatur mollitia ea quam. Eaque
						quam temporibus aliquid asperiores vero, ea, molestias laboriosam
						ipsam commodi iure inventore accusamus assumenda, ipsa pariatur illo
						delectus vitae sunt reprehenderit ad blanditiis quibusdam
						dignissimos aliquam? Accusamus, neque soluta provident voluptas a
						nisi voluptates necessitatibus incidunt obcaecati officiis, odio
						cumque ullam excepturi aliquid placeat ea. Officia, facilis?
						Explicabo iusto rem voluptate inventore harum molestias ab
						consequatur eius nesciunt. Quia fugit adipisci excepturi quas rem
						reiciendis, qui est voluptatibus, sequi quaerat mollitia ipsam?
						Autem ad saepe ipsum maxime, minus nisi libero. Quia id possimus
						culpa cupiditate repellat, nisi eligendi laboriosam molestias minima
						sunt, dolorum odio minus corrupti et eaque, nostrum tempore
						provident illo accusamus cumque alias quis repudiandae saepe!
						Dolores rerum at perferendis nisi earum! Eum saepe eligendi velit
						obcaecati culpa amet odio, quam quidem architecto veniam quo fugiat
						incidunt, veritatis modi ipsa minus quos? Magni neque quaerat
						quisquam eligendi tempore voluptate mollitia nemo cupiditate
						inventore numquam, temporibus saepe praesentium, distinctio cum eum.
						Explicabo sint aut tempora quod quidem dicta non tenetur veritatis,
						enim assumenda, animi veniam culpa incidunt ex molestias quisquam
						iure. Eveniet labore corporis sit illum ad magni incidunt
						perspiciatis reiciendis, ea non necessitatibus provident. Aliquam
						reprehenderit excepturi amet? Nostrum accusamus velit iste mollitia,
						repellendus fugiat vero fuga, nesciunt at explicabo excepturi
						numquam hic, ab voluptatum expedita culpa suscipit officiis ut
						commodi consectetur quam. Totam repellat, doloremque expedita ad
						deserunt blanditiis quae quaerat. Ipsum, voluptatibus maxime. Odio
						qui aspernatur deserunt hic saepe reprehenderit beatae! Mollitia
						sunt et ullam cumque suscipit perspiciatis doloribus quam commodi a
						earum distinctio repudiandae quibusdam, magni necessitatibus optio
						provident minima! Incidunt quisquam esse ut? Reiciendis molestias,
						doloribus tempora sint odio qui perferendis id consectetur modi
						deleniti alias placeat quis laboriosam ut repellat vero totam
						officia consequatur neque. Recusandae quidem obcaecati aperiam vel
						sunt modi molestiae dicta dolorem rerum velit in natus reiciendis
						facere labore rem numquam, eos corrupti quaerat ea minus placeat
						quisquam alias totam?Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Voluptate obcaecati, aliquam repellat, rerum iusto
						nemo consequuntur vitae excepturi, incidunt voluptas deserunt! Ipsum
						nam perspiciatis facilis modi quod deserunt incidunt beatae, nisi
						consequuntur optio cumque eos, sint aperiam, ab iste atque
						dignissimos aut reiciendis ea molestias! Quae quam dolor iure
						tenetur sequi deserunt odit ad qui pariatur veniam hic nihil
						aspernatur, itaque perspiciatis velit fugit possimus. Sunt pariatur
						quisquam illum maxime, recusandae debitis. Sed unde itaque
						reiciendis. Quod ullam ipsum neque saepe obcaecati, consectetur eos
						laborum quaerat nesciunt? Neque, soluta. Necessitatibus itaque
						asperiores consequatur recusandae esse possimus eius, tempora
						dolorem dicta, quaerat autem? Iste ab non deleniti corrupti itaque
						ea est corporis obcaecati cumque, unde rem, sed expedita fugiat
						ipsum at ullam fugit debitis animi ex temporibus consequatur
						distinctio aperiam aliquam id? Quas culpa laboriosam ipsa voluptatem
						beatae quo ullam consequatur nihil distinctio voluptatum? Ipsum
						totam aperiam sequi ullam architecto voluptatibus distinctio eveniet
						qui consequatur reprehenderit consequuntur sed magnam enim harum
						deleniti eius ratione dignissimos libero voluptatum, sint, illum
						perferendis in ut? Harum ipsam quaerat ipsa dolore, iusto aspernatur
						obcaecati non nobis excepturi eum quidem repudiandae, eveniet sit
						sed blanditiis deserunt est, impedit adipisci tempore quae sapiente
						expedita ducimus? Impedit quam repellendus blanditiis ex minima,
						ratione, quae quis perferendis minus necessitatibus quasi repellat
						iste quos distinctio repudiandae incidunt, officia quaerat.
						Asperiores quo omnis nesciunt ipsa necessitatibus nam, vel
						recusandae quas magnam, quibusdam minus, quod libero iusto facere
						nulla distinctio cupiditate sit tenetur assumenda nemo velit tempora
						in. Necessitatibus mollitia officiis est eius quis cum excepturi
						maxime sequi dolorum iste error, sed incidunt non illum accusantium
						nesciunt provident magni optio? Totam distinctio nostrum, impedit
						dolores deleniti suscipit porro in consectetur eius assumenda
						eligendi praesentium maiores exercitationem dignissimos laudantium
						dolorum. Necessitatibus quia laborum quibusdam qui, suscipit id
						debitis vel eos cumque veritatis minima repudiandae in ratione hic
						possimus accusamus. Consequuntur delectus facere modi, ad voluptate
						quam repellat deleniti. Quod rem aliquam mollitia hic labore,
						eveniet exercitationem ipsa, accusamus animi ullam nihil vitae
						tempore quam molestiae enim optio consectetur amet ut quaerat
						laboriosam iste nam quia. Illum porro illo quas dolorem delectus!
						Laboriosam, vero ab! Nobis beatae nisi itaque enim molestiae.
						Accusantium quisquam tenetur veritatis tempore natus. Magnam est
						ducimus illum voluptatibus cum sunt doloremque itaque placeat
						mollitia maiores repellendus excepturi, fuga quia enim natus alias,
						aspernatur ea molestias ab tempora. Voluptatum ducimus quas,
						deserunt ratione distinctio voluptas dolorem commodi in molestiae
						eligendi quos. Impedit deleniti velit labore iure, soluta quisquam
						fugiat dicta omnis atque eaque, est delectus sed eveniet alias
						quibusdam fuga! Doloremque quae, architecto nesciunt laudantium
						omnis, tempore porro, voluptas libero dolores reiciendis adipisci
						magnam? Accusamus minus natus laboriosam, iste ipsa deleniti in
						voluptatibus ipsum itaque nisi commodi doloribus exercitationem
						omnis dolores aliquid id provident modi aperiam similique. Sint
						dignissimos esse itaque, maxime facere numquam molestias omnis quae,
						possimus, architecto eligendi in? Repellat perferendis, magnam
						eveniet laudantium sapiente placeat in suscipit tempore sunt ipsa,
						obcaecati ea sit illum libero saepe ipsam quia. Soluta rerum
						molestiae ea omnis, doloremque non! Distinctio fuga in culpa,
						quaerat soluta adipisci sapiente vitae cum at dicta! Repudiandae
						animi eius quaerat officia asperiores, nihil facilis veritatis?
						Reiciendis, beatae officiis voluptates omnis rerum, alias iure
						deleniti fugiat adipisci minima minus. Ipsum, quis illo harum dolore
						animi odio itaque nam, at ex repellendus voluptas saepe perspiciatis
						laborum! Temporibus quisquam, dolorem necessitatibus eveniet qui
						eum! Sit assumenda dignissimos itaque ducimus aliquid architecto,
						mollitia aliquam tempore quibusdam nostrum sunt? Accusamus a sit
						amet ea delectus sunt ratione nulla enim quod! Adipisci aperiam
						cumque velit, enim facilis aut sed, illum ipsa aspernatur accusamus
						debitis labore. Consectetur quisquam magni consequuntur voluptate,
						blanditiis doloremque magnam illo, nemo at modi delectus soluta
						dolore quibusdam iure laudantium inventore beatae hic eligendi
						aliquam! Sequi soluta, alias tempora hic ut ipsam aspernatur debitis
						assumenda dicta doloremque voluptas exercitationem blanditiis animi
						magni iusto minima cupiditate adipisci eum. Corporis, amet. Ex nemo
						provident soluta fuga incidunt hic deserunt commodi consectetur,
						tenetur id adipisci, voluptate excepturi. Repellendus tempore velit
						totam maxime quidem ipsa laboriosam iusto porro eius, dolorem, a
						aspernatur officiis blanditiis! Molestias molestiae iure modi
						aperiam inventore ipsam itaque non sunt voluptates aliquam vero sit
						facere ut quis laborum, voluptatibus esse explicabo saepe nihil
						beatae sequi possimus numquam? Porro vitae odio dolores, velit in
						accusantium laudantium consequuntur beatae, itaque accusamus harum
						voluptate eaque at distinctio ullam. Id provident quisquam nemo,
						officiis eum adipisci ipsam voluptatum incidunt, optio facilis totam
						laudantium sequi architecto? Unde vitae sapiente ut. Consequatur
						saepe velit quas harum omnis iure facilis, nobis ducimus? Magnam qui
						dolor repellendus nobis, quia dolorem totam optio, amet nam
						consequuntur, ea temporibus quasi consequatur iste blanditiis magni
						inventore tempora ut quidem id aliquam et. Sit ad est ab porro quo
						provident quisquam sequi error voluptatibus debitis molestiae quas
						maiores accusamus quis ipsum architecto, laboriosam voluptates,
						repellat id? Adipisci, totam. Repellat esse incidunt praesentium
						quaerat earum, autem cupiditate ullam natus maxime corrupti facilis
						eveniet quo nesciunt, maiores non quia. Eius, hic dolorem ut, minima
						voluptatum culpa exercitationem odio iusto delectus vel consectetur
						quae esse veritatis doloribus, earum numquam perspiciatis quas
						adipisci quis. Aliquam eveniet ipsum nam reprehenderit esse ab
						obcaecati incidunt perferendis delectus, sed quibusdam magnam
						sapiente nobis reiciendis similique facere beatae praesentium
						laudantium molestiae, rerum, vitae ex voluptatem error vel. Sed
						ipsam, nostrum dolor ad nobis vitae, officiis minus dignissimos
						perferendis iste tempora. Repudiandae magni debitis aut consequuntur
						perspiciatis ipsam nulla beatae minus incidunt blanditiis? Velit
						quis sed ullam inventore nisi reprehenderit. Fugit voluptatibus
						facilis maxime molestias delectus quisquam, neque blanditiis quidem
						officiis quas hic omnis dolores, tenetur quos, minus alias totam?
						Labore fugit dignissimos alias ab temporibus soluta, quasi quis
						adipisci earum quo! Animi aspernatur voluptas ipsam necessitatibus
						beatae vero aliquam corrupti quos sunt repellendus culpa porro
						eveniet aliquid possimus, est officiis architecto, molestias,
						excepturi tempore eos accusamus neque illum! Aliquam qui quae odio
						libero doloribus, illum recusandae necessitatibus, dolore totam
						obcaecati, ullam possimus blanditiis. Quod modi accusantium quo
						laborum. Deserunt, consequuntur labore! Corrupti corporis quos
						voluptatem explicabo rem repellendus tempore doloribus atque? Saepe,
						quaerat! Ipsa asperiores molestiae perspiciatis! Distinctio, iste
						reiciendis!
					</section>
				</main>
			</div>
		</>
	);
};

export default App;
