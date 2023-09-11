import Banner from "../../images/Banner.jpg";
import '../../Banner.css'
import Spacer from "../../Spacer";
import { UserContext } from "../../context/UserContext";
import { useContext} from "react";



const MainBanner = () => {

    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;

    return (
        <div className="banner">
            {/* <p className="text-[200px] font-semibold text-white-700">Blue Moon Cinema</p> */}
            <img src={Banner} alt="Banner" className="banner-image" />
            
            {(!currentUser || !currentUser.isAuthenticated) &&
                <div className="banner-text">
                    <h1 style={{fontSize: '100px'}}>Blue Moon Cinema</h1>
                </div> 
            }
            {(currentUser) && currentUser.isAuthenticated &&
                <div className="banner-text">
                    <h1 style={{fontSize: '100px', color:'white'}}>Welcome, {currentUser.username}</h1>
                </div> 
            }
            <div>
                <Spacer height="8rem"/>
            </div>
            <div className="text-below-banner">
                <h1 style={{fontSize: '80px'}}>Featured Movies</h1>
            </div>
            <div>
                <Spacer height="3rem"/>
            </div>
        </div>
    );
};

export default MainBanner; 