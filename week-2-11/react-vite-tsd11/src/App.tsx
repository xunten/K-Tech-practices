import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartManagement/CartProvider";
import ProductList from "./CartManagement/ProductList";
import CartList from "./CartManagement/CartList";
import BuyerForm from "./CartManagement/BuyerForm";
import Header from "./CartManagement/Header";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/cart"
            element={
              <div>
                <CartList />
                <BuyerForm />
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );

}
export default App;