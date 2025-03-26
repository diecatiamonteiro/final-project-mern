
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AllVenuesPage from "./pages/AllVenuesPage";
import AllArtistsPage from "./pages/AllArtistsPage";
import IndividualVenuePage from "./pages/IndividualVenuePage";
import IndividualArtistPage from "./pages/IndividualArtistPage";
import FavouritesPage from "./pages/FavouritesPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerificationPage from "./pages/VerificationPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="venues" element={<AllVenuesPage />} />
          <Route path="artists" element={<AllArtistsPage />} />
          <Route path="venue/:id" element={<IndividualVenuePage />} />
          <Route path="artist/:id" element={<IndividualArtistPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="verify-email" element={<VerificationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
