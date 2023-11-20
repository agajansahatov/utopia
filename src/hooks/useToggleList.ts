import axios from "axios";
import { Template } from "../interfaces/Template";
import { getBaseURL } from "../config/Configuration";

const useToggleList = () => {
    
    const toggleList = <T extends Template>(
		items: T[],
		endpoint: string,
		userId: number,
		productId: number,
		setItems: (items: T[]) => void,
        setError: (msg: string) => void,
	): void => {
		if (!userId) return;

		let currentItem: T;
		const exists = items.some((item) => {
			const isMatch = item.userId === userId && item.productId === productId;
			if (isMatch) {
				currentItem = item;
			}
			return isMatch;
		});

		if (exists) {
			//Remove item from the list
			const newItems = items.filter(
				(item) => !(item.userId === userId && item.productId === productId),
			);
			setItems(newItems);

			axios
				.delete(`${getBaseURL()}/${endpoint}`, {
					data: {
						userId: userId,
						productId: productId,
					},
				})
				.catch((error) => {
					//Add item to the list
					const newItems = [...items, currentItem];
					setItems(newItems);
					setError(`Couldn't remove like, because of "${error}"`);
				});
		} else {
			//Add item to the list
			const newItem: T & Template = {
				userId: userId,
				productId: productId,
				date: new Date().toISOString(),
			} as T & Template;
			const newItems = [...items, { ...newItem }];
			setItems(newItems);

			axios
				.post(`${getBaseURL()}/${endpoint}`, {
					userId: userId,
					productId: productId,
				})
				.catch((error) => {
					//Remove item from the list
					const newItems = items.filter(
						(item) => !(item.userId === userId && item.productId === productId),
					);
					setItems(newItems);
					setError(`Couldn't put like, because of "${error}"`);
				});
		}
	};
    
    return {toggleList}
}

export default useToggleList;