import { UserProvider } from './context/UserContext';
import ErrorBoundary from './ErrorBoundary';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import MovieGrid from './pages/Movies/MoviesGridPage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import HistoryPage from './pages/Options/HistoryPage';
import ReservationsPage from './pages/Reservations/ReservationsPage';
import SeatingPage from './pages/Seating/SeatingPage';
import ConfirmationPage from './pages/Confirmation/ConfirmationPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Option2 from './pages/Options/Option2';
import { MovieProvider } from './context/MovieContext';
import wallpaper from "./images/wallpaper.jpg";
//import ReservationsPage from "./pages/Reservations/ReservationsPage";



const MyApp = () => {

  return (

    <div className="wrapper" style={{ backgroundImage: `url(${wallpaper})`, backgroundAttachment: 'fixed' }}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <UserProvider>
          <MovieProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/transactionhistory/:userId" element={<HistoryPage />} />
                <Route path="/Option2" element={<Option2 />} />
                <Route path="/Movies" element={<MovieGrid />} />
                <Route path="/movies/:movieId" element={<MovieDetailPage />} />
                <Route path="/reservation/:showtimeId" element={<ReservationsPage />} />
                <Route path="/seating/:reservationId" element={<SeatingPage />} />
                <Route path="/confirmation/:reservationId" element={<ConfirmationPage />} />
                {/* <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="*" element={<NoMatch />} /> */}
              </Routes>
            </BrowserRouter>
          </MovieProvider>
        </UserProvider>
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;