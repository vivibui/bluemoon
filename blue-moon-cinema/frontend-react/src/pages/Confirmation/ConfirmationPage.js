import { useParams } from "react-router-dom";
import Layout from '../../components/ui/Layout';
import Confirmation from '../../components/ui/reservations/Confirmation.js';
import Row from 'react-bootstrap/Row';


const SeatingPage = ({ children }) => {
    let { reservationId } = useParams();

    return (
        <Layout>
            <Row>
                <Confirmation reservationId={reservationId} />
                {children}
            </Row>
        </Layout>
    );
}
export default SeatingPage;