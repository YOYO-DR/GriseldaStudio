import Layout from "../../components/Layout";
import Image from "react-bootstrap/esm/Image";
import logotipo from "../../../assets/images/logotipo.png";
import styles from "./Home.module.css";
import RowProducts from "../../components/Products/RowProducts";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";


function Home({}) {
  return (
    <Layout>
      <section className="section-intro padding-y-sm">
        <Container>
          <div className="intro-banner-wrap d-flex justify-content-center">
            <Image fluid src={logotipo} rounded className={styles.img_prin} />
          </div>
        </Container>
      </section>

      <section className="section-name padding-y-sm">
        <Container>
          <header className="section-heading">
            {/* <Link to="/store" className="btn btn-outline-primary float-right">
              Ver Todo
            </Link> */}
            <h3 className="section-title">Productos</h3>
          </header>
          <RowProducts/>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
