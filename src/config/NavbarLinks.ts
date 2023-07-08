let navbarLinks = [
	{
		id: 0,
		auth: 0,
		label: "Home",
		url: "/",
	},
	{
		id: 1,
		auth: 1,
		label: "History",
		url: "/history",
	},
	{
		id: 2,
		auth: 1,
		label: "Balance",
		url: "/balance",
	},
	{
		id: 3,
		auth: 0,
		label: "Login",
		url: "/login",
	},
	{
		id: 4,
		auth: 1,
		label: "Account",
		url: "/account",
	},
];

export function getNavbarLinks() {
	return navbarLinks;
}
