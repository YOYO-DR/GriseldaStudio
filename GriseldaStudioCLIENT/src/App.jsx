import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./presentation/pages/Home";
// import Login from "./presentation/pages/Login";
// import Register from "./presentation/pages/Register";
// import Store from "./presentation/pages/Store";
// import DetailProduct from "./presentation/pages/DetailProduct";
// import ProtectedRoute from "./presentation/components/routes/ProtectedRoute";
import NotFound from "./presentation/pages/NotFound/";
import DetailProduct from "./presentation/pages/DetailProduct";
import CartContextProvider from "./application/context/CartContext";
import CartPage from "./presentation/pages/CartPage";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/store" element={<Store />} /> */}
        <Route path="/product/:slug" element={<DetailProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;
