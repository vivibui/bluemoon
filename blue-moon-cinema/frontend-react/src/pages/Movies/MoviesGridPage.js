import Layout from "../../components/ui/Layout";
import MovieGrid from "../../components/ui/movie/MovieGrid"
import MovieSearch from "../../components/form/MovieSearch"

const MoviesGridPage = ({ children }) => {
    return (
        <Layout>
            <div className="container">
                <MovieSearch />
                <MovieGrid />
            </div>
            {children}
        </Layout>
    );
}
export default MoviesGridPage;
