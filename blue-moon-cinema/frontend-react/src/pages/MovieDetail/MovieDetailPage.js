import { useParams } from "react-router-dom";
import Layout from '../../components/ui/Layout';
import MovieDetail from '../../components/ui/movie/MovieDetail';


const MovieDetailPage = ({ children }) => {
  let { movieId } = useParams();  

  return (
    <Layout>
      <MovieDetail movieId={movieId}/>
      {children}
    </Layout>
  );
}
export default MovieDetailPage;