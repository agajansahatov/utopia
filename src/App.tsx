import { getNavbarLinks } from "./config/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<>
			<NavbarTop links={getNavbarLinks()} />;
			<div style={{ marginTop: "42px", textAlign: "center" }}>
				<Outlet />
			</div>
		</>
	);
};

export default App;
