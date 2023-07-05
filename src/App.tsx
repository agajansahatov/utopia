import { getNavbarLinks } from "./services/NavbarLinks";
import NavbarTop from "./components/NavbarTop";
import Home from "./pages/Home";

const App = () => {
	return (
		<>
			<NavbarTop links={getNavbarLinks()} selected={0} />;
			<div style={{ marginTop: "42px", textAlign: "center" }}>
				<Home />
			</div>
		</>
	);
};

export default App;
