import { useEffect, useContext } from "react";
import { getMoviesForYou } from "../../api/MovieApi";
import MovieGrid from "../../components/ui/movie/MovieGrid";
import Layout from "../../components/ui/Layout";
import { MovieContext } from "../../context/MovieContext"; 
import MainBanner from "../../components/ui/MainBanner";
// import Spacer from "../../Spacer";
// import {Modal,ModalBody, ModalHeader} from 'reactstrap';
// import Login from '../../pages/Login/Login';
import Footer from "../../components/ui/Footer";
import Spacer from "../../Spacer";

const Home = ({children}) => {    
    const { setCurrentMovies } = useContext(MovieContext);
    const movieContext = useContext(MovieContext);
    const currentMovies = movieContext.currentMovies;
   
    useEffect(() => {
        const search = async () => {
            //const log = await Login;
            //setLogin(log);
            const localMovies = await getMoviesForYou();
            const moviesInfo = {
                currentMovies: localMovies,
                searches: currentMovies.searches,
                lastSearch: currentMovies.lastSearch
            };
            setCurrentMovies(moviesInfo);
        }
        search();
    }, [currentMovies.lastSearch, currentMovies.searches, setCurrentMovies]);
        

    //Modal Code
    // const [mainModal, setMainModal] = useState(false);
    // const toggleMainModal = event => {
    //     event.preventDefault();
    //     setMainModal(!mainModal);
    // }

    return (
        <Layout>
            <MainBanner/>
            {/* <Spacer heigth="10000rem"/> */}
            <MovieGrid />
            {/* <Spacer heigth="10000rem"/> */}
            {children}


            {/* Modal Display
            <button type="submit" className="btn btn-primary"  onClick = {toggleMainModal}> Log In </button>
            <Modal isOpen={mainModal} toggle={toggleMainModal} backdrop={true} size='lg'>
                <ModalHeader toggle={toggleMainModal}>
                    <h1> Login </h1>
                </ModalHeader>
                <ModalBody> 
                            <Login> </Login>
                </ModalBody>
                {/* <ModalFooter>
                <button type="button" class="btn btn-secondary" onClick={toggleMainModal}>Close</button>
                <button type="button" class="btn btn-primary" onClick={toggleMainModal}>Submit</button>
                </ModalFooter> */}
            {/* </Modal> */}
            <Spacer height={'5rem'}/>
            <Footer />
        </Layout>
    );
}

export default Home;
