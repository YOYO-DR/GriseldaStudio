import React, { createContext, useState } from 'react';
import Cart from '../../domain/entities/Store/Cart';
// Crear el contexto
const Context = createContext();

const CartContextProvider = ({ children }) => {
  const [CantidadCart, setCantidadCart] = useState(new Cart().getCantidad());  // valor inicial 

  return (
    <Context.Provider value={{ CantidadCart, setCantidadCart }}>
      {children}
    </Context.Provider>
  );
};

export default CartContextProvider;
export {Context}