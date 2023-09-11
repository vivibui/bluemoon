import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom';
import Logo from '../../images/BlueMoon.jpg'
import { Modal, ModalBody, ModalHeader, NavbarText, NavLink } from 'reactstrap';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';


const Header = () => {
	const userContext = useContext(UserContext);
	const currentUser = userContext.currentUser;
	const loc = useLocation();
	const isModal = loc.pathname === '/Login';

	const [mainModal, setMainModal] = useState(false);
	const toggleMainModal = event => {
		event.preventDefault();
		setMainModal(!mainModal);
	}
	const [mainModal2, setMainModal2] = useState(false);
	const toggleMainModal2 = event => {
		event.preventDefault();
		setMainModal2(!mainModal2);
	}
	// TODO: Add register 
	// TODO: Remove navbar from Modal 
	return (
		<>
			<header>
				{!isModal &&
					<Nav>
						<Navbar bg="light" variant="light" expand="lg">
							<Container>
								<Navbar.Brand>
									<img src={Logo} alt="Blue Moon Logo" />
								</Navbar.Brand>
								<NavbarText>
									<div className="nav navbar-nav ms-auto w-100 justify-content-end">
										<div className="nav-item">
											{currentUser && currentUser.isAuthenticated &&
												<div id="loggedin">{currentUser.username} <br /></div>
											}
										</div>
									</div>
								</NavbarText>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="justify-content-center">
										<LinkContainer to="/">
											<Nav.Link>Home</Nav.Link>
										</LinkContainer>
										{(!currentUser || !currentUser.isAuthenticated) &&
											<NavLink to="/Login" onClick={toggleMainModal}>Login
												{/* Modal Display */}
												<Modal isOpen={mainModal} toggle={toggleMainModal} backdrop={true} size='lg'>
													<ModalHeader toggle={toggleMainModal}>
														<h1> Login </h1>
													</ModalHeader>
													<ModalBody>
														<Login> </Login>
													</ModalBody>
												</Modal>
											</NavLink>
										}
										{(!currentUser || !currentUser.isAuthenticated) &&
											<NavLink to="/Register" onClick={toggleMainModal2}>Register
												{/* Modal Display */}
												<Modal isOpen={mainModal2} toggle={toggleMainModal2} backdrop={true} size='lg'>
													<ModalHeader toggle={toggleMainModal2}>
														<h1> Register </h1>
													</ModalHeader>
													<ModalBody>
														<Register> </Register>
													</ModalBody>
												</Modal>
											</NavLink>
										}
										{(currentUser) && currentUser.isAuthenticated &&
											<NavDropdown title="My Account" id="basic-nav-dropdown">
												<LinkContainer to={{ pathname: `/transactionhistory/${currentUser.id}` }}>
													<NavDropdown.Item>Reservation History</NavDropdown.Item>
												</LinkContainer>
												{/* Add another option here: 
												Example: (1) Edit account, (2) Edit upcoming reservations   */}
												{/* <LinkContainer to="/Option2">
													<NavDropdown.Item>Option 2</NavDropdown.Item>
												</LinkContainer> */}
											</NavDropdown>
										}

										{(currentUser) && currentUser.isAuthenticated &&
											<NavLink to="/Login" onClick={toggleMainModal}>Logout
												<Modal isOpen={mainModal} toggle={toggleMainModal} backdrop={true} size='lg'>
													<ModalHeader toggle={toggleMainModal}>
														<h1> Logout </h1>
													</ModalHeader>
													<ModalBody>
														<Login> </Login>
													</ModalBody>
												</Modal>
											</NavLink>
										}
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</Nav>
				}
			</header>
		</>
	);
};

export default Header;
