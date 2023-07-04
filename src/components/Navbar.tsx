const Navbar = () => {
	return (
		<nav
			className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
			data-bs-theme="dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img
						src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
						alt="Logo"
						height="35"
						className="d-inline-block align-middle"
					/>
					<span className="align-middle ps-2">Bootstrap</span>
				</a>

				<button className="navbar-toggler" type="button">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ms-auto fs-5">
						<li className="nav-item mx-2">
							<a className="nav-link active" href="/">
								Home
							</a>
						</li>
						<li className="nav-item mx-2">
							<a className="nav-link" href="#">
								History
							</a>
						</li>
						<li className="nav-item mx-2">
							<a className="nav-link" href="#">
								Account
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
