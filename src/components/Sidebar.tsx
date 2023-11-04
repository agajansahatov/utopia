import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/esm/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { getBrand } from "../config/Configuration";

interface Props {
	isVisible: boolean;
	onHide: () => void;
}

const Sidebar = ({ isVisible, onHide }: Props) => {
	const { logo, name: appName } = getBrand();

	return (
		<>
			<Offcanvas
				show={isVisible}
				onHide={onHide}
				responsive="lg"
				scroll={true}
				backdrop="static"
				className="bg-info text-white vh-100 overflow-hidden sticky-lg-top"
			>
				<Offcanvas.Body className="p-0 m-0 d-block">
					<Navbar
						className="px-2 px-lg-4 bg-gradient justify-content-between"
						bg="black"
						data-bs-theme="dark"
						variant="dark"
						expand={false}
						sticky="top"
					>
						<Navbar.Brand as={NavLink} to="/">
							<img
								className="d-inline-block align-middle logo"
								src={logo}
								height="35"
								alt=""
							/>
							<span className="align-middle ms-2">{appName}</span>
						</Navbar.Brand>
						<Button
							type="button"
							variant="outline-dark"
							className="text-white pb-2 border-0 d-lg-none"
							onClick={onHide}
						>
							<BsArrowLeft />
						</Button>
					</Navbar>
					<div id="sidebar-body">
						<p>
							This is content within an <code>.offcanvas-lg</code>. Lorem, ipsum
							dolor sit amet consectetur adipisicing elit. Iusto consectetur
							molestiae aliquid ipsam? Molestias, sit voluptates hic sint
							delectus eum maxime ea accusamus voluptas placeat nesciunt id
							dolorum commodi vel animi sed unde repudiandae! Rem amet,
							repellendus, commodi quae nesciunt quasi error harum fugiat
							quisquam rerum blanditiis voluptatibus! Dolorum culpa in ut
							inventore iusto provident numquam impedit corrupti quaerat
							doloribus totam laudantium, hic deleniti necessitatibus porro
							magni nulla officia consectetur! Architecto reiciendis nobis
							consequatur culpa necessitatibus quaerat, incidunt dolores illum
							quis minus ducimus dolorum autem laborum earum corrupti
							exercitationem voluptatem expedita hic et dicta assumenda ullam
							molestiae temporibus vitae. Voluptate asperiores quis voluptas non
							aliquam modi? Asperiores ipsa dolore accusamus, tempore fugit
							necessitatibus accusantium quod nobis reiciendis aut itaque
							labore. Laudantium, beatae! Ullam consectetur impedit, a eligendi
							inventore delectus nam omnis, enim temporibus voluptas, dolorum
							incidunt itaque veritatis praesentium commodi nobis vel iure quo
							numquam tenetur debitis tempore! Odit eligendi, rem libero vitae
							maxime magnam, voluptate perferendis ullam facere veniam doloribus
							saepe voluptatum odio quae eveniet amet perspiciatis illo
							consectetur quia architecto praesentium eum, adipisci voluptates
							ipsam? Nesciunt repellendus aliquid vero, dolorem ratione nisi
							maxime, asperiores consequatur saepe, quae voluptatem praesentium.
							Molestias illum itaque eos, velit quis quod esse id fugit,
							officiis rem quidem perferendis quas sint reprehenderit quasi ab
							exercitationem aperiam quae placeat ut dolor. Id beatae veritatis
							recusandae doloribus, ea eaque magnam pariatur officia nesciunt,
							quos non ipsum repellendus fugiat quo nulla consequatur
							architecto, totam veniam? Distinctio quasi quas consequatur quia
							consequuntur modi reprehenderit! Est, nobis. Odio dolorem
							asperiores inventore eius quis enim maxime, provident unde fugit
							officia exercitationem ut dolores nihil sit tenetur quam esse!
							Laboriosam quod blanditiis dicta corrupti provident architecto
							odit autem aut, molestiae consectetur totam rem ea laudantium et
							enim nemo tenetur mollitia quidem reiciendis dolore, unde debitis
							at. Vero ab quod autem nemo atque officiis ad iusto quae quas
							veritatis voluptate et doloribus praesentium, impedit ut molestiae
							itaque, omnis, quisquam aspernatur reprehenderit. Aliquid
							voluptates accusamus reiciendis, nostrum dolore iste perspiciatis
							commodi quia animi similique ducimus, quae accusantium unde
							placeat quibusdam fugiat exercitationem dolores dolor libero? Sit,
							impedit neque nostrum quas explicabo in veritatis officiis
							temporibus distinctio, esse at. Aspernatur quasi totam cupiditate,
							consectetur libero perferendis sapiente. Enim sed maxime eos,
							dolores harum accusantium animi quos odio dignissimos vero quo
							consequuntur veritatis! Cum dicta earum minima voluptatibus
							nesciunt officia laborum error, quasi omnis laudantium aliquid
							dolores alias delectus adipisci tenetur voluptates provident
							dignissimos libero, minus illo quae quia officiis consectetur? Ut
							culpa tempora tenetur nulla temporibus consectetur porro
							aspernatur odit doloribus quia quaerat perferendis, optio,
							laudantium enim recusandae impedit ducimus distinctio eligendi
							cupiditate dolorum vitae! Aspernatur fugit impedit cumque velit
							repudiandae ullam odio sed quae animi. Consequuntur voluptas quod
							neque iusto iure fuga fugit error ut dicta incidunt, sint
							architecto, nihil aliquam vitae tempore, odio ipsum vel aliquid
							possimus libero ipsam repellendus modi. Animi dolores ipsam
							incidunt a quae molestiae earum impedit porro numquam? Itaque esse
							voluptatum cum? Nam dolores voluptatem facere ipsum vero officia
							unde sequi non, delectus minima cum ad iure soluta labore vel
							tempore impedit assumenda dicta quo maiores tempora aut distinctio
							ab repudiandae. Veniam voluptatem necessitatibus numquam
							recusandae, aliquid impedit accusamus. Modi ipsa ea praesentium
							omnis aut officiis soluta! Repellat iusto quidem dicta enim
							dolorum, laboriosam pariatur? Ipsa laborum enim similique cum
							dicta provident hic odio voluptatum pariatur id nisi inventore
							error repellendus, illo dolorum sequi quisquam quibusdam
							consequuntur! Praesentium repellendus in, quasi fugit, ipsa
							laborum numquam accusantium dolorum dolor voluptatum iste
							distinctio quos incidunt. Quis sed voluptates assumenda. Accusamus
							esse alias quam fugit rerum molestiae, ratione quod repellendus
							totam architecto ex incidunt, adipisci atque, culpa est ullam
							voluptas aspernatur doloribus! Nemo quidem amet placeat dolore
							excepturi, praesentium unde libero ipsum, maxime sed qui, veniam
							ducimus temporibus! Accusamus ipsa perspiciatis molestiae, et
							inventore sapiente dolores commodi voluptatibus beatae porro,
							quasi tenetur natus sed tempora esse accusantium placeat pariatur
							id explicabo asperiores. Quas, odit recusandae ea perferendis
							pariatur doloremque mollitia ad, voluptatibus repellat commodi,
							tenetur minus. Ut incidunt iste animi velit consequatur doloremque
							laudantium ipsa soluta, tenetur, amet sit hic. Excepturi cum
							sapiente dolor temporibus harum sint quos eos vitae numquam! In
							quia aspernatur modi deleniti ratione quo illum, sapiente iusto
							nulla, veniam reprehenderit tempora temporibus vitae. Commodi
							quasi obcaecati dignissimos eaque natus eligendi quo voluptate
							officiis dicta ipsum unde, ducimus nostrum deserunt assumenda
							alias explicabo fuga vitae voluptatum molestiae reiciendis dolores
							magni ratione molestias hic? Quisquam iusto consequatur ipsa
							voluptatem sed culpa consequuntur ab? Placeat iusto repellat quae
							architecto quibusdam? Debitis libero illo nostrum totam
							consectetur ex, neque fuga ab nesciunt unde. Quo atque tenetur
							obcaecati accusantium magni libero sit beatae molestias facilis
							ratione, voluptatibus quidem perspiciatis laudantium, voluptatem
							aperiam assumenda sequi odit praesentium, nulla consequuntur
							dolorem quae? Fugit hic quisquam nulla quidem nemo cupiditate quas
							mollitia sequi nesciunt dignissimos explicabo reiciendis dolor
							iure nihil placeat ad ut, incidunt dolorem voluptatum, sunt quis
							iusto. Earum assumenda repudiandae velit id maxime corporis,
							dolores odio optio natus repellat asperiores repellendus. Dicta
							eius aspernatur aperiam, maxime corporis, itaque doloremque
							similique architecto quisquam cupiditate quod ullam! Ipsum minima
							ratione dolores odit reiciendis explicabo architecto ea labore
							unde earum. Repellendus, perspiciatis explicabo? Suscipit vero
							earum molestiae cumque aspernatur? Perferendis, temporibus id
							numquam perspiciatis quibusdam laudantium quas vel inventore
							cumque minima eius ipsa sed voluptatem corporis laboriosam
							nesciunt minus explicabo! Animi doloremque consectetur in
							repellendus dolore ipsum sunt id eaque, nobis totam quibusdam
							dolorem modi iusto tempore quae minus voluptatem omnis molestias.
							Laborum ipsam at quia illo repellendus assumenda cum nam ea,
							repudiandae sit dignissimos minus quaerat dolore optio
							exercitationem nostrum fugiat expedita! Id ut omnis sapiente ea
							labore nobis at sit commodi quod dignissimos voluptates,
							perferendis pariatur dolores impedit fuga ipsa corporis et nam.
							Distinctio, at quam maiores tenetur natus veniam, quod molestiae
							quibusdam culpa molestias magnam, veritatis sit libero. Eius atque
							minus suscipit, ut quibusdam pariatur? Doloremque maxime
							architecto asperiores ex obcaecati nesciunt officia repellat
							delectus minima quisquam ut, tempore, soluta atque possimus!
							Fugiat quod recusandae architecto saepe, nulla numquam odit
							quaerat quasi vitae, laborum nostrum unde. Quos, velit. Facilis
							nemo in fugit ad!
						</p>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default Sidebar;
