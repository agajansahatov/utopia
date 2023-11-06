import Sidebar from "../components/Sidebar";
import Profile from "../sections/Profile";
import Admin from "../sections/Admin";
import useAuth from "../hooks/useAuth";
import { User } from "./../interfaces/User";
import Balance from "../sections/Balance";
import { AppLink } from "./../interfaces/AppLink";
import { useOutletContext, useParams } from "react-router-dom";
import { ContextType } from "../App";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";

let sidebarLinks: AppLink[] = [
	{
		id: 0,
		label: "Profile",
		link: "profile",
	},

	{
		id: 1,
		label: "Balance",
		link: "balance",
	},
	{
		id: 2,
		label: "Logout",
		link: "logout",
	},
];

const Account = () => {
	const { isSidebarVisible, onHideSidebar, onShowSidebar } =
		useOutletContext<ContextType>();

	let logoutId = 2;
	const user: User | null = useAuth();
	if (user && user.id === 1) {
		sidebarLinks = [
			{
				id: 0,
				label: "Admin",
				link: "admin",
			},
			{
				id: 1,
				label: "Profile",
				link: "profile",
			},

			{
				id: 2,
				label: "Balance",
				link: "balance",
			},
			{
				id: 3,
				label: "Logout",
				link: "logout",
			},
		];
		logoutId = 3;
	}

	const { page } = useParams();

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

	if (content === logoutId) {
		//Logout
		localStorage.removeItem("user");
		window.location.pathname = "/login";
	}

	return (
		<>
			<NavbarTop links={getNavbarLinks()} onShowSidebar={onShowSidebar} />

			<Sidebar
				elements={sidebarLinks}
				root="/account/"
				active={content}
				isVisible={isSidebarVisible}
				onHide={onHideSidebar}
			/>

			{user && user.id === 1 ? (
				<main className="wrapper-fixed overflow-auto position-fixed top-0">
					{content == 0 && <Admin />}
					{content == 1 && <Profile />}
					{content == 2 && <Balance />}
				</main>
			) : (
				<main className="wrapper-fixed overflow-auto position-fixed top-0">
					{content == 0 && <Profile />}
					{content == 1 && <Balance />}
				</main>
			)}
		</>
	);
};

export default Account;
