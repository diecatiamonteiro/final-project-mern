import { Routes, Route } from "react-router-dom";
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
import UploadImage from "./components/UploadImage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="venues" element={<AllVenuesPage />} />
        <Route path="artists" element={<AllArtistsPage />} />
        <Route path="venue/:venueId" element={<IndividualVenuePage />} />
        <Route path="artist/:artistId" element={<IndividualArtistPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="verify-email" element={<VerificationPage />} />
        <Route path="upload-image" element={<UploadImage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
