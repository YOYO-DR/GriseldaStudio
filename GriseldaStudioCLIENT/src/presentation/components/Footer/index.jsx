import { Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className={`section-footer border-top`} >
      <Container>
        <section className="d-flex flex-column flex-md-row footer-bottom border-top justify-content-between text-center">
          <Col md={3}>
            <p className="text-muted">
              Desarrollado por{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://portafolio-yoiner.azurewebsites.net"
              >
                Yoiner
              </a>{" "}
              &{" "}
              <a rel="noreferrer" target="_blank" href="https://portafolio-santiago.com">
                Santiago
              </a>
            </p>
          </Col>
          <div className="text-md-center d-flex flex-column flex-md-row">
            <span className="px-md-2">GriseldaStudio@gmail.com</span>
            <span className="px-md-2">+1980-986-7233</span>
            <span className="px-md-2">Cali - Valle del Cauca</span>
          </div>
        </section>
      </Container>
    </footer>
  );
}

export default Footer;
