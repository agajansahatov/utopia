import { Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const schema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.string().min(1),
	category: z.string().min(1),
});

//Interface
type FormData = z.infer<typeof schema>;

interface Props {
	show: boolean;
	onHide: () => boolean;
}

function NewProductForm(props: Props) {
	const [serviceError, setServiceError] = useState("");

	const user = useAuth();
	if (!user) {
		return <Navigate to="/" />;
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		axios
			.post("http://localhost:8080/products", {
				name: data.name,
				image: "assets/products/product1.webp",
				description: data.description,
				price: data.price.toString(),
				category: data.category,
				date: "",
				popularity: "",
			})
			.then((res) => {
				props.onHide();
			})
			.catch((e) => {
				setServiceError(e.message);
			});
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					New Product
				</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
					reset();
				})}
				className="mb-2">
				<Modal.Body className="d-flex justify-content-center">
					<div className="login-form p-5 mx-2 mt-2 mb-3 rounded bg-dark">
						<h2 className="text-center mb-3">PRODUCT</h2>
						{serviceError && (
							<p className="text-danger mb-1 text-center">{serviceError}</p>
						)}

						<Form.Group className="mb-3" controlId="nameField">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								{...register("name")}
								type="text"
								placeholder="Product Name"
							/>
							{errors.name && (
								<p className="text-danger">{errors.name.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="descriptionField">
							<Form.Label>Description</Form.Label>
							<Form.Control
								{...register("description")}
								type="text"
								placeholder="Description"
							/>
							{errors.description && (
								<p className="text-danger">{errors.description.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="priceField">
							<Form.Label>Price</Form.Label>
							<Form.Control
								{...register("price")}
								type="text"
								placeholder="Price"
							/>
							{errors.price && (
								<p className="text-danger">{errors.price.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="categoryField">
							<Form.Label>Category</Form.Label>
							<Form.Control
								{...register("category")}
								type="text"
								placeholder="Category"
							/>
							{errors.category && (
								<p className="text-danger">{errors.category.message}</p>
							)}
						</Form.Group>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" className="px-5">
						Add
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default NewProductForm;
