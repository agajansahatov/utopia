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
				className="btnLike"
			/>
		);
	else
		return (
			<AiOutlineHeart
				size={36}
				onClick={onToggle}
				color="inherit"
				className="btnLike"
			/>
		);
};

export default Like;
