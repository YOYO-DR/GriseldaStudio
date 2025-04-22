import Card from "react-bootstrap/Card";
import Placeholder from 'react-bootstrap/Placeholder';
import styles from "./CardLoading.module.css";

function CardLoading() {
  return (<Card className={`card-product-grid ${styles.h_rem_12}`}>
    <Card.Body className="d-flex flex-column justify-content-end">
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} />
      </Placeholder>
      <Placeholder.Button variant="primary" xs={6} />
    </Card.Body>
  </Card>)
}
/*
<Card className="card-product-grid">
      <Link className="img-wrap" to={`/product/${slug}`}>
        <Image src={imagen} />
      </Link>
      <figcaption className="info-wrap">
        <Link to={`/product/${slug}`} className="title">
          {nombre}
        </Link>
        
        <div className="price mt-1">{precio_lectura}</div>
      </figcaption>
    </Card>*/

export default CardLoading;