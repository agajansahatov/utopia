import logo from "../assets/logo.jpg";

const brand = {
	logo: logo,
	name: "Utopia",
	copyrightDate: "2023",
};

export function getBrand() {
	return brand;
}

export function getBaseURL() {
	return "http://localhost:8080/";
}

export function getProductImageURL(imageName: string) {
	return getBaseURL() + "images/products/" + imageName;
}

export function getUserImageURL(imageName: string) {
	return getBaseURL() + "images/users/" + imageName;
}
