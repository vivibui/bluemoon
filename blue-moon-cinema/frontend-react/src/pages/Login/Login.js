import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Layout from "../../components/ui/Layout";
import { UserContext } from "../../context/UserContext";
import LogoutButton from '../../components/form/LogoutButton';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../api/UserApi';
import Spacer from "../../Spacer";
import { ModalFooter } from 'reactstrap';
import '../../App.css';

const Login = ({ children }) => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const doSetPassword = (event) => {
        setPassword(event.target.value);
    };


    // Modal Code
    const [mainModal, setMainModal] = useState(false);
    const handleCancel = event => {
        event.preventDefault();
        setMainModal(!mainModal);
    };

    const handleLogin = (event) => {
        if (event !== undefined) event.preventDefault();
        const loginCurrentUser = async () => {
            const userLogin = { 'username': username, 'password': password };
            const loggedInUser = await loginUser(userLogin);
            if (loggedInUser) {
                loggedInUser.user.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(loggedInUser.user));
                localStorage.setItem('token', loggedInUser.token);
                setCurrentUser(loggedInUser.user);
                navigate("/");
            }
        };
        loginCurrentUser();
    };
    return (
        <Layout>
            <div>
                <Spacer height="8rem" />
            </div>
            <div style={{ alignItems: "center", justifyContent: "center", display: "flex"}}>
            {(!currentUser || !currentUser.isAuthenticated) &&
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label for='LoginUsername' >Username</Form.Label>
                        <Form.Control id='LoginUsername' style={{width:'20rem'}} type="email" placeholder="Enter username"
                            value={username} onChange={doSetUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"style={{width:'20rem'}} placeholder="Password"
                            value={password} onChange={doSetPassword} />
                    </Form.Group>
                    <ModalFooter>
                    <div>
                        <Spacer height="3rem" />
                    </div>
                        <button type="button" class="btn btn-primary" onClick={handleLogin}>Login</button>
                        <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </ModalFooter>
                </Form>
            }
            {currentUser && currentUser.isAuthenticated &&
                <div>
                    <LogoutButton></LogoutButton>
                </div>

            }
            {children}
            </div>
            <div>
                <Spacer height="10rem" />
            </div>
        </Layout>
    );
}
export default Login;