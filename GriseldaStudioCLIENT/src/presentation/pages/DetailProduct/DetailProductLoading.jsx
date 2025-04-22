import loader_fondo from "../../../assets/images/loader_fondo.png";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Placeholder } from "react-bootstrap";

function DetailProductLoading() {
  return (
    <Card>
      <Row className="no-gutters">
        <Col md={6}>
          <article className="gallery-wrap">
            <div className="img-big-wrap text-center">
              <Image src={loader_fondo} className="w-75 h-75"></Image>
            </div>
          </article>
        </Col>
        <Col md={6} className="border-start d-flex align-items-center">
          <article className="content-body">
            <Placeholder as={Card.Title} animation="glow" className="mb-3">
              <Placeholder xs={6} />
            </Placeholder>
            <div className="mb-3 d-flex flex-column justify-content-start">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
            </div>
            {/* <p>{producto.descripcion}</p> */}
            <hr />
            <Row>
              <div className="item-option-select">
                <Placeholder as={Card.Title} animation="glow" className="mb-3">
                  <Placeholder xs={3} />
                </Placeholder>
                <Col md={4} sm={6} className="col-6">
                <Placeholder as={Card.Title} animation="glow" >
                  <Placeholder xs={2} />{" "}
                  <Placeholder xs={5} />{" "}
                  <Placeholder xs={2} />
                </Placeholder>
                </Col>
              </div>
            </Row>
            <hr />
            <div className="d-flex flex-column flex-sm-row">
              <Placeholder.Button
                className="mb-3 mb-sm-0 me-2"
                xs={3}
                aria-hidden="true"
              />

              <Placeholder.Button xs={4} aria-hidden="true" />
            </div>
          </article>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailProductLoading;
