import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
	status: boolean;
	onToggle: () => void;
}

const Like = ({ status, onToggle }: Props) => {
	if (status)
		return (
			<AiFillHeart
				color="#ff475a"
				size={36}
				onClick={onToggle}
				style={{ cursor: "pointer" }}
			/>
		);
	else
		return (
			<AiOutlineHeart
				size={36}
				onClick={onToggle}
				style={{ cursor: "pointer" }}
			/>
		);
};

export default Like;
