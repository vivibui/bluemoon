import { useParams } from "react-router-dom";
import Layout from '../../components/ui/Layout';
import Seating from '../../components/ui/reservations/Seating';
import Row from 'react-bootstrap/Row';


const SeatingPage = ({ children }) => {
    let { showtimeId } = useParams();

    return (
        <Layout>
            <Row>
                <Seating showtimeId={showtimeId} />
                {children}
            </Row>
        </Layout>
    );
}
export default SeatingPage;