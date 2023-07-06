import { getNavbarLinks } from "./config/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<>
			<NavbarTop links={getNavbarLinks()} />;
			<div className="main">
				<Outlet />
			</div>
		</>
	);
};

export default App;
