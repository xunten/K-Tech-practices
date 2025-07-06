
import { useState } from 'react';
import './App.css'
import Calculator from './components/Calculator'
import RegistrationForm from './components/RegistrationForm'

import { CartProvider } from "./context/CartContext";
import ProductGrid from "./components/ProductGrid";
import CartIcon from "./components/CartIcon";
import CartDropdown from "./components/CartDropdown";


function App() {

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="App">
      <h1>Caculator</h1>
      <Calculator />

      <div>
        <h1>Registration Form</h1>
        <RegistrationForm />  
      </div>   

      <CartProvider>
      <div className="app">
        <header className="header">
          <h1>Shopping Cart</h1>
          <CartIcon onClick={() => setCartOpen((v) => !v)} />
        </header>
        <CartDropdown visible={cartOpen} onClose={() => setCartOpen(false)} />
        <main>
          <ProductGrid />
        </main>
      </div>
      </CartProvider>   
    </main>
  )
}

export default App
