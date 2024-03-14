import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import CartDetail from "./components/CartDetail/CartDetail";
import CategoryList from "./components/CategoryList/CategoryList";
import Login from "./components/Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route path="/category-list/:id" element={<CategoryList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
