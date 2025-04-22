import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import Producto from "../../../../domain/entities/Store/Producto";
import CardLoading from "../CardLoading";
import styles from "./CardProducts.module.css";

function CardProductHome({ product, loading }) {
  // Si esta cargando, se muestra un placeholder
  if (loading) {
    return <CardLoading />;
  }
  const { nombre, precio, precio_oferta, imagen, slug } = product;

  const precio_lectura =
    precio_oferta.num > 0 ? precio_oferta.lectura : precio.lectura;

  // Si no esta cargando, se muestra el producto
  return (
    <Card className="card-product-grid">
      <Link
        className="img-wrap d-flex align-items-center justify-content-center"
        to={`/product/${slug}`}
      >
        <Image src={imagen} className={`${styles.h_fit_c} ${styles.border_rad_10}`} />
      </Link>
      <figcaption className="info-wrap">
        <Link to={`/product/${slug}`} className="title">
          {nombre}
        </Link>
        <div className="price mt-1">{precio_lectura}</div>
      </figcaption>
    </Card>
  );
}

export { CardProductHome };
