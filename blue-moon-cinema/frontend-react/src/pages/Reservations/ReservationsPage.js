import { useParams } from "react-router-dom";
import Layout from '../../components/ui/Layout';
import Reservations from '../../components/ui/reservations/Reservations.js';


const ReservationsPage = ({ children }) => {
  let { showtimeId } = useParams();  

  return (
    <Layout>
      <Reservations showtimeId={showtimeId}/>
      {children}
    </Layout>
  );
}
export default ReservationsPage;