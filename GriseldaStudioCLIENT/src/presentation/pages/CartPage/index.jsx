import Layout from "../../components/Layout";
import CartItem from "../../components/CartItem";
import Cart from "../../../domain/entities/Store/Cart";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import { Context } from "../../../application/context/CartContext";
import styles from "./CartPage.module.css";
import Button from "react-bootstrap/Button";
import getMensajeWhatsappCart from "../../../helpers/messageWhatsapp";


function CartPage() {
  // obtener el carrito del usuario
  const carrito = new Cart();
  const [totalItems, setTotalItems] = useState(carrito.getTotal().lectura);
  const { CantidadCart, setCantidadCart } = useContext(Context);

  const updateTotal = () => {
    // DESPUES: Crear context a nivel del CartPage para actualizar el total del carrito
    carrito.getCart(); // Actualizo el carrito, ya que se modifico internamente en el componente CartItem
    setTotalItems(carrito.getTotal().lectura);
    setCantidadCart(carrito.items.length);
  };

  const removeItem = (item) => {
    carrito.deleteItem(item);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Producto eliminado",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener("mouseenter", Swal.stopTimer);
      //   toast.addEventListener("mouseleave", Swal.resumeTimer);
      // },
    });
    updateTotal();
  };

  // Valido si hay items en el carrito, sino hay, muestro un mensaje, si si hay, muestro los items
  const valiItems =
    carrito.items.length <= 0 ? ( // ? si no hay items
      <tr>
        <td colSpan="3" className="text-center py-3">
          Sin productos en el carrito,{" "}
          <Link to={"/"} className="link-primary">
            Ir a la tienda
          </Link>
        </td>
      </tr>
    ) : (
      // : si hay items
      carrito.items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          updateTotal={updateTotal}
          removeItem={removeItem}
        />
      ))
    );

  const tableHead =
    CantidadCart === 0 ? (
      ""
    ) : (
      <tr className="small text-uppercase">
        <th scope="col" className={`${styles.w_40} ${styles.w_100_mobile}`}>
          Producto
        </th>
        <th
          scope="col"
          className={`${styles.w_25} ${styles.d_md_none_1} text-center`}
        >
          Cantidad
        </th>
        <th
          scope="col"
          className={`${styles.w_25} ${styles.d_md_none_1} text-center`}
        >
          Precio
        </th>
        <th
          scope="col"
          className={`text-right ${styles.w_16} ${styles.d_md_none_1}`}
        >
          {" "}
        </th>
      </tr>
    );

  const buttonsControl =
    CantidadCart === 0 ? (
      ""
    ) : (
      <aside className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <dl className="dlist-align">
              <dt>Precio total:</dt>
              <dd className="text-right">{totalItems}</dd>
            </dl>
            <hr />
            {/* Crear el link con una funcion que el texto lo convierte el url, mirar proyecto de Xiomara */}
            <a
              href={getMensajeWhatsappCart()}

              className="btn btn-success btn-block w-100 mb-2"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-whatsapp"></i> Comprar
            </a>
            <Link to="/" className="btn btn-light btn-block w-100 mb-2">
              Continua comprando
            </Link>
            <Button
              className="btn btn-danger btn-block w-100"
              onClick={() => {
                carrito.clear();
                updateTotal();
              }}
            >
              Limpiar carrito
            </Button>
          </div>
        </div>
      </aside>
    );

  return (
    <Layout>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <aside className={`col-12 col-lg-${CantidadCart === 0 ? 12 : 9} mb-2 mb-lg-0`}>
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">{tableHead}</thead>
                  <tbody>{valiItems}</tbody>
                </table>
              </div>
            </aside>
            {buttonsControl}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CartPage;
