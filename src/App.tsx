import { getNavbarLinks } from "./config/NavbarLinks";
import TopNavbar from "./components/TopNavbar";
import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<>
			<TopNavbar links={getNavbarLinks()} />;
			<div style={{ marginTop: "42px", textAlign: "center" }}>
				<Outlet />
			</div>
		</>
	);
};

export default App;
