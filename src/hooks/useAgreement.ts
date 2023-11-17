import { Agree } from "../interfaces/Agree";

const useAgreement = () => {
	const str = localStorage.getItem("agreed");

	if (str == null || str == "null") return null;

	const agreed: Agree = JSON.parse(str);
	if (agreed.status != null && agreed.date !== null) return agreed;
	else return null;
};

export default useAgreement;