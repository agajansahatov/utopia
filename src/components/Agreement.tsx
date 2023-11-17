import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Agree } from "./../interfaces/Agree";
import useAgreement from "../hooks/useAgreement";

const Agreement = () => {
	const [show, setShow] = useState(false);

	const onAgree = () => {
		const agreed: Agree = {
			status: true,
			date: new Date(),
		};
		localStorage.setItem("agreed", JSON.stringify(agreed));
		setShow(false);
	};

	useEffect(() => {
		const agreement: Agree | null = useAgreement();
		if (!agreement || agreement.status == false || !agreement.date) {
			setShow(true);
			return;
		}

		const currentDate: Date = new Date();
		const oldDate: Date = new Date(agreement.date);
		const differenceInMilliseconds: number =
			currentDate.getTime() - oldDate.getTime();

		const differenceInDays: number =
			differenceInMilliseconds / (1000 * 60 * 60 * 24);

		if (differenceInDays > 7) {
			localStorage.removeItem("agreed");
			setShow(true);
			return;
		}
	}, []);

	return (
		<>
			<Modal
				show={show}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header className="d-flex justify-content-center">
					<Modal.Title className="text-warning">Warning!</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center text-white">
					<h6>This is just a DEMO online store web app for testing.</h6>
					<p className="">The products on this web app are not real.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={onAgree} className="ms-auto">
						Understood
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Agreement;
