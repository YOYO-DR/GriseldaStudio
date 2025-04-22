import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import logotipo from "../../../assets/images/logotipo.png";
import styles from "./NavigationBar.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/esm/Button";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../application/context/CartContext";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

function NavigationBar({}) {
  const { CantidadCart, setCantidadCart } = useContext(Context);
  // Esto se debe traer despues del seridor
  // const menuItems = [
  //   { to: "#/action-3", key: "elec-1", mensaje: "Electronica / Tv, Audio" },
  //   { to: "#/action-4", key: "depo-2", mensaje: "Deportes / Fitness" },
  //   { to: "#/action-5", key: "sal-3", mensaje: "Salud / Belleza" },
  //   { to: "#/action-6", key: "hog-4", mensaje: "Hogar / Muebles / Jardin" },
  //   { to: "#/action-7", key: "juguw-5", mensaje: "Juguetes / Niños / Bebes" },
  // ];

  const [valueSearch, setValueSearch] = useState("");

  return (
    <header className={`section-header ${styles.sticky_top}`}>
      <section className="border-bottom">
        <Container>
          <Navbar expand="lg" className="">
            <Container fluid>
              <Link to={"/"} className="navbar-brand">
                <Image className={styles.logo} src={logotipo}></Image>
              </Link>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="m-auto my-2 my-lg-0 w-100 d-flex justify-content-end">
                  {/* <Dropdown className="me-0 me-md-2 mb-2 mb-md-0">
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        className="w-100"
                      >
                        <i className="fa fa-bars"></i> Categorias
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {menuItems.map((item) => (
                          <Dropdown.Item key={item.key} href={item.to}>
                            {item.mensaje}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>  */}
                  <Link
                    to="/"
                    className={"w-100 me-0 me-md-2 btn btn-outline-primary"}
                  >
                    Inicio
                  </Link>
                  
                </Nav>
                <Col className="col-12 order-2 order-lg-3 d-flex flex-column-reverse flex-md-row align-items-center">
                  {/* <Form className="search col-12 col-md-8">
                    <InputGroup>
                      <Form.Control
                        placeholder="Buscar..."
                        aria-label="Buscar..."
                        aria-describedby="basic-addon2"
                        onInput={(e) => setValueSearch(e.target.value)}
                      />
                      <Button
                        variant="primary"
                        id="button-addon2"
                        onClick={(e) => {
                          // esto solo es de prueba
                          e.preventDefault();
                          alert("Buscando...");
                          setTimeout(
                            () => alert("No se encontro ni monda"),
                            2000
                          );
                        }}
                      >
                        <i className="fa fa-search"></i>
                      </Button>
                    </InputGroup>
                  </Form> */}
                  <div className="mt-2 mt-md-0 d-flex justify-content-around justify-content-md-end mb-3 mb-lg-0 col-12">
                    <div className="widget-header d-flex align-items-center fs-5 me-3">
                      {/* <small className="title text-muted"> */}
                      Bienvenido visitante!
                      {/* </small> */}
                      <div>
                        {/* <Link to="/login/">Iniciar sesión</Link> 
                    <span className="dark-transp"> | </span>
                    <Link to="/register/"> Registrar</Link> */}
                      </div>
                    </div>
                    <Link to="/cart" className="widget-header pl-3 ml-3">
                      <div className="ms-1 icon icon-sm rounded-circle border">
                        <i className="fa fa-shopping-cart"></i>
                      </div>
                      <span className="badge badge-pill badge-danger notify">
                        {CantidadCart}
                      </span>
                    </Link>
                  </div>
                </Col>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </section>
    </header>
  );
}

export default NavigationBar; /*}

/*
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
*/ /*
/*
<header className="section-header">
      <section className="header-main border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={2} md={3} className="col-6">
              <Link to="/" className="brand-wrap">
                <Image className={styles.logo} src={logotipo}></Image>
              </Link>
            </Col>

            <Col lg sm md className="col-6 flex-grow-0">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  <i className="fa fa-bars"></i> Categorias
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menuItems.map((item) => (
                    <Dropdown.Item key={item.key} href={item.to}>
                      {item.mensaje}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Link
              to="/store"
              className={"btn btn-outline-primary " + styles.w_auto}
            >
              Tienda
            </Link>

            <Col lg md={6} sm={12}>
              <Form className="search">
                <InputGroup>
                  <Form.Control
                    placeholder="Buscar..."
                    aria-label="Buscar..."
                    aria-describedby="basic-addon2"
                    onInput={(e) => setValueSearch(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    id="button-addon2"
                    
                    onClick={(e) => { // esto solo es de prueba
                      e.preventDefault();
                      alert("Buscando...")
                      setTimeout(()=> alert("No se encontro ni monda"),2000)
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Col>

            <Col lg={3} sm={6} className="col-8 order-2 order-lg-3">
              <div className="d-flex justify-content-around mb-3 mb-lg-0">
                <div className="widget-header d-flex align-items-center fs-5">
                  {/* <small className="title text-muted"> */ /*
                    Bienvenido visitante!
                  {/* </small> */ /*}
                  <div>
                    {/* <Link to="/login/">Iniciar sesión</Link> 
                    <span className="dark-transp"> | </span>
                    <Link to="/register/"> Registrar</Link> */ /*}
                  </div>
                </div>
                <Link to="/cart" className="widget-header pl-3 ml-3">
                  <div className="ms-1 icon icon-sm rounded-circle border">
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                  <span className="badge badge-pill badge-danger notify">
                    {CantidadCart}
                  </span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
</header>
    
    */
