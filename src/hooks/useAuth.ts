import { User } from "./../interfaces/User";

const useAuth = () => {
	const s = localStorage.getItem("user");

	if (s == null || s == "null") return null;

	const user: User = JSON.parse(s);
	if (user.contact) return user;
	else return null;
};

export default useAuth;
