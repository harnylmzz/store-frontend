import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import CartDetail from "./components/CartDetail/CartDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart-detail" element={<CartDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
