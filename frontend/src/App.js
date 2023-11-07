import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DiningHall from "./pages/DiningHall";
import DiningHallWithReviews from "./pages/DiningHallWithReviews";

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <div className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/halls" element={<DiningHall />} />
            <Route
              path="/dininghall/:locationName"
              element={<DiningHallWithReviews />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
