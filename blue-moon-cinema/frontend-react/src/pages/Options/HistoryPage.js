import { useParams } from "react-router-dom";
import Layout from '../../components/ui/Layout';
import History from '../../components/ui/history/History';


const HistoryPage = ({ children }) => {
  let { userId } = useParams();  

  return (
    <Layout>
      <History userId={userId}/>
      {children}
    </Layout>
  );
}
export default HistoryPage;