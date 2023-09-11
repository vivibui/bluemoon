import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Layout from "../../components/ui/Layout";
import { UserContext } from "../../context/UserContext";
import LogoutButton from '../../components/form/LogoutButton';
import { useNavigate } from "react-router-dom";
import Spacer from "../../Spacer";
import { ModalFooter } from 'reactstrap';
import '../../App.css';
import { registerUser } from '../../api/UserApi';


const Register = ({ children }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;

    const [message, setMessage] = useState('');


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const doSetPassword = (event) => {
        setPassword(event.target.value);
    };


    const handleCancel = () => {
        setPassword('');
        navigate("/");
    };


    // TODO: Work on handleRegister and return, non of these are implemented fully 
    const handleRegister = (event) => {
        if (event !== undefined) event.preventDefault();
        const registerCurrentUser = async () => {
            const userRegister = { 'username': username, 'password': password, 'role': 'ROLE_USER' };
            const registeredUser = await registerUser(userRegister);
            if (registeredUser) {
                // loggedInUser.user.isAuthenticated = true;
                // localStorage.setItem('user', JSON.stringify(loggedInUser.user));
                // localStorage.setItem('token', loggedInUser.token);        
                // setCurrentUser(registeredUser.user);
                navigate("/Login");
            }
        };
        setMessage('You have been registered!');
        registerCurrentUser();
    };

    return (
        <Layout>
            <div>
                <Spacer height="8rem" />
            </div>
            <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
            {(!currentUser || !currentUser.isAuthenticated) &&
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" style={{width:'20rem'}} placeholder="Enter username"
                            value={username} onChange={doSetUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" style={{width:'20rem'}} placeholder="Password"
                            value={password} onChange={doSetPassword} />
                    </Form.Group>
                    {/* <Button  className="btn btn-primary" onClick={handleLogin} style={{margin:'2rem'}} type="submit">
                            Login
                        </Button>
                        <Button  className="btn btn-secondary" onClick={handleCancel}>
                            Cancel
                        </Button> */}
                    <ModalFooter>
                        {/* <div class="tacbox">
                            <input id="checkbox" type="checkbox" required="required" />
                            <label for="checkbox"> I agree to the Terms and Conditions of this site</label>
                        </div> */}
                        <p> {message}</p>
                        <button type="button" class="btn btn-primary" onClick={handleRegister}> Sign Up</button>
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
export default Register;