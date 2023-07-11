import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Profile from "../sections/Profile";
import Admin from "../sections/Admin";
import useAuth from "../hooks/useAuth";
import { User } from "./../interfaces/User";

let sidebarLinks = [
	{
		id: 0,
		label: "Profile",
	},

	{
		id: 1,
		label: "Balance",
	},
	{
		id: 2,
		label: "Logout",
	},
];

const Account = () => {
	const [content, setContent] = useState(0);

	let logoutId = 2;
	const user: User | null = useAuth();
	if (user && user.id === 1) {
		sidebarLinks = [
			{
				id: 0,
				label: "Admin",
			},
			{
				id: 1,
				label: "Profile",
			},

			{
				id: 2,
				label: "Balance",
			},
			{
				id: 3,
				label: "Logout",
			},
		];

		logoutId = 3;
	}

	const onContentChange = (id: number) => {
		if (id === logoutId) {
			//Logout
			localStorage.removeItem("user");
			window.location.pathname = "/login";
		} else {
			setContent(id);
		}
	};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
			<main className="content">
				{content == 0 && <Admin />}
				{content == 1 && <Profile />}
			</main>
		</>
	);
};

export default Account;
