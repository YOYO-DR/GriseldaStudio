import { Button } from "react-bootstrap";
import InputCantidad from "../forms/InputCantidad";
import { useState, useEffect } from "react";
import Cart from "../../../domain/entities/Store/Cart";
import { numeroPrecio } from "../../../helpers/number";
import styles from "./CartItem.module.css";


function CartItem({ item, updateTotal, removeItem }) {
  // crear una funcion del carrito que sea como update y actualice el context a nivel de carrito y que tambie de alguna forma acceder desde el CartPage para poner o modificar en la parte izquierda
  const [cantidad, setCantidad] = useState(item.quantity);
  // Obtengo el carrito por si toca actualizar la cantidad de un item
  const cart = new Cart();
  // Precio del item segun si esta en oferta
  const precio_item =
    item.product.precio_oferta.num > 0
      ? item.product.precio_oferta
      : item.product.precio;
  
    // Estado para el total del item
    const [total, setTotal] = useState(item.quantity * precio_item.num);

  // useEffect para actualizar la cantidad del item
  useEffect(() => {
    // Variable para validar si el carrito tiene el item
    let itemExists = false; // de casualidad de que se borre de localstorage pero lo tenga en pantalla
    cart.items = cart.items.map((item_cart) => {
      if (item_cart.product.id === item.product.id) {
        itemExists = true;
        // si existe el item, se actualiza la cantidad
        item_cart.quantity = cantidad;
        return item_cart; // retorno el item actualizado
      }
      return item_cart; // si no coincide, retorno el item normal
    });

    if (!itemExists) {
      // si no existe el item, se pone la cantidad y se agrega
      item.quantity = cantidad;
      cart.addItem(item);
    }

    // Actualizar el total del item
    setTotal(cantidad * precio_item.num);

    cart.save(); // guardo

    // actualizar el total del carrito
    updateTotal();

    // Modificar el valor total del item
  }, [cantidad]);

  return (
    <tr className={`${styles.d_flex_md_column_1} border-top border-bottom mb-2 text-center rounded`}>
      <td>
        <figure className="itemside align-items-center d-flex flex-column flex-md-row">
          <div className="aside">
            <img src={item.product.imagen} className="img-sm" />
          </div>
          <figcaption className="info">
            <a
              href={`/product/${item.product.slug}`}
              className="title text-dark"
            >
              {item.product.nombre}
            </a>
          </figcaption>
        </figure>
      </td>
      <td className={`${styles.v_alig_mid}`}>
        <div className="col">
          <InputCantidad
            value={cantidad}
            setValue={setCantidad}
            maxValue={item.product.stock}
          />
        </div>
      </td>
      <td className={`${styles.v_alig_mid}`}>
        <div className="price-wrap">
          <var className="price">{numeroPrecio(total)}</var>
          <small className="text-muted"> {numeroPrecio(precio_item.num)} cada uno </small>
        </div>
      </td>
      <td className={`${styles.v_alig_mid}`}>
        <Button variant="danger" onClick={() => removeItem(item)}>
          Eliminar
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;
