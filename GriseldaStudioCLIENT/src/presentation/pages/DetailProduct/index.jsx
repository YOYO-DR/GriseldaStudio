import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { obtenerProducto } from "../../../api/productos/productos";
import { useEffect, useState, useContext } from "react";
import ErrorStatus from "../../components/validators/ErrorStatus";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import style from "./DetailProduct.module.css";
import InputCantidad from "../../components/forms/InputCantidad";
import { Button } from "react-bootstrap";
import { Context } from "../../../application/context/CartContext";
import Cart, { CartItem } from "../../../domain/entities/Store/Cart";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import DetailProductLoading from "./DetailProductLoading";
import { getMensajeWhatsappProd } from "../../../helpers/messageWhatsapp";

function DetailProduct() {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState({ status: 0, mensaje: "" });
  const [cantidad, setCantidad] = useState(1);
  const { CantidadCart, setCantidadCart } = useContext(Context);
  const [loading, setLoading] = useState(true);
  // Obtener el carrito
  const Carrito = new Cart();

  const hadleAddingValueCart = () => {
    // creo el Item del carrito
    const item = new CartItem({ product: producto, quantity: cantidad });
    // Agrego el item al carrito
    const agrego = Carrito.addItem(item); // si el producto ya existe en el carrito, se suma la cantidad
    setCantidadCart(Carrito.getCantidad());
    // Sweetalert2
    if (agrego[0] === false) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: agrego[1],
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }

    if (agrego[0] === true) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: agrego[1],
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        // didOpen: (toast) => {
        //   toast.addEventListener("mouseenter", Swal.stopTimer);
        //   toast.addEventListener("mouseleave", Swal.resumeTimer);
        // },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await obtenerProducto(slug, setError); // el obtener producto retorna un objeto Producto
        if (data) {
          setProducto(data);
          setError({ status: 200, mensaje: "" });
          setLoading(false);
          return;
        }

      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  // validar error con el status, con un componete para ello
  if (error.status !== 200 && error.status !== 0) {
    return <ErrorStatus error={error} />;
  }

  // ventana de carga, luego modificacarla
  if (error.status === 0) {
    return (
      <Layout>
        <main className="h-100 d-flex align-items-center">
          <section className={`section-content padding-y bg ${style.flex_1}`}>
            <Container>
              <DetailProductLoading />
            </Container>
          </section>
        </main>
      </Layout>
    );
  }

  //validar precio de oferta
  const precio =
    producto.precio_oferta.num > 0 ? (
      <>
        <var className="price h4 mb-0 pb-0">
          {producto.precio_oferta.lectura}
        </var>

        <del className="price-old fs-5">{producto.precio.lectura}</del>
        <span className="text-success small">
          <i className="fas fa-arrow-down"></i> {producto.getPorDescuento()}%
          descuento
        </span>
      </>
    ) : (
      <var className="price h4">{producto.precio.lectura}</var>
    );

  return (
    <Layout>
      <main className="h-100 d-flex align-items-center">
        <section className={`section-content padding-y bg ${style.flex_1}`}>
          <Container>
            <Card>
              <Row className="no-gutters">
                <Col md={6}>
                  <article className="gallery-wrap">
                    <div className="img-fluid text-center">
                      <Image className={`w-100 ${style.border_rad_10}`} src={producto.imagen}></Image>
                    </div>
                  </article>
                </Col>
                <Col md={6} className="border-start d-flex align-items-center">
                  <article className="content-body">
                    <h2 className="title">{producto.nombre}</h2>
                    <div className="mb-3 d-flex flex-column justify-content-start">
                      {precio}
                    </div>
                    <p>{producto.descripcion}</p>
                    <hr />
                    <Row>
                      <div className="item-option-select">
                        <h6>Ingresar cantidad</h6>
                        <Col md={4} sm={6} className="col-6">
                          <InputCantidad
                            value={cantidad}
                            setValue={setCantidad}
                            maxValue={producto.stock}
                          />
                        </Col>
                      </div>
                    </Row>
                    <hr />
                    <div className="d-flex flex-column flex-md-row">
                      <a
                        className="btn btn-primary me-0 me-md-3 mb-2 mb-md-0"
                        target="_blank"
                        href={getMensajeWhatsappProd(producto, cantidad)}
                        rel="noreferrer"
                      >
                        <span className="text">Comprar</span>
                        <i className="fas fa-shopping-cart"></i>
                      </a>

                      <Button
                        variant={"success"}
                        onClick={hadleAddingValueCart}
                      >
                        <span className="text">Agregar al carrito</span>
                        <i className="fas fa-shopping-cart"></i>
                      </Button>
                    </div>
                  </article>
                </Col>
              </Row>
            </Card>
          </Container>
        </section>
      </main>
    </Layout>
  );
}

export default DetailProduct;
