import { Toast, ToastContainer } from "react-bootstrap";

interface Props {
	isVisible: boolean;
	message: string;
	type: "error" | "success" | null;
	onClose: () => void;
}

const Toaster = ({ isVisible, message, type, onClose }: Props) => {
	let header = "Failure";
	let bg = "danger";

	if (type == "success") {
		header = "Success";
		bg = "success";
	}

	return (
		<ToastContainer
			className="status-toaster p-3 position-fixed "
			position="middle-center"
		>
			<Toast
				// delay={3000}
				// autohide
				className={`bg-${bg} text-white z-1 toast`}
				onClose={onClose}
				show={isVisible}
				style={{ boxShadow: "0 0 10px 0 #fff" }}
			>
				<Toast.Header>
					<strong className="me-auto">{header}</strong>
				</Toast.Header>
				<Toast.Body className="text-center">{message}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default Toaster;
