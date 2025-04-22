import { obtenerProductos } from "../../../api/productos/productos";
import { useEffect, useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { CardProductHome } from "./CardProducts";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import setError from "../hooks/useError";

function RowProducts() {
  const [productos, setProductos] = useState({
    search: [0, 1, 2, 3],
    total: [0, 1, 2, 3],
  });
  const {error, handleError} = setError();
  const [loading, setLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState("");

  // Funcion que realiza la busqueda
  const search = (palabra) => {
    if (loading) return;
    // Cuando le de clic en buscar, se ejecuta esta funcion
    setProductos((prevState) => ({
      ...prevState, // Tener el estado anterior antes de modificarle alguna propiedad
      search: prevState.total.filter((producto) =>
        producto.nombre.toLowerCase().includes(palabra.toLowerCase())
      ),
    }));
  };

  // useEffect para la busqueda de productos
  // Para que se ejecute cada vez que cambie el valor de valueSearch
  useEffect(() => {
    if (loading) return; // Si no esta cargando, entonces que busque
    search(valueSearch);
  }, [valueSearch]);

  // useEffect es un hook que se ejecuta despues de que el componente se haya renderizado, y no lo dejo con el then, porque esta devolviendo solo la promesa, y no el resultado de la promesa
  useEffect(() => {
    async function fetchData() {
      try {
        const productos = await obtenerProductos();
        setProductos({ search: productos.data, total: productos.data }); // Guardo los productos en el estado
        setLoading(false);

        handleError(productos.status === 0 ? "Error al comunicarse con el servidor, comuniquese con el administrador" : false);
      } catch (err) {
        handleError("Error al comunicarse con el servidor, comuniquese con el administrador");
      }
    }
    fetchData();
  }, []); // no se le pasa parametros (dependencia) pq solo se ejcutará una vez

  // Variable para listar los productos o mostrar mensaje de resultado de la busqueda
  const ListaProductos =
    productos.search.length === 0 && !loading ? ( // Si no hay productos y no esta cargando, entonces que muestre el mensaje
      <p className="text-center col-12 col-md-6">No se encontraron productos</p>
    ) : (
      productos.search.map((producto) => (
        <Col
          md={4}
          lg={3}
          key={`col-${producto?.id ? producto.id : producto}`}
          className="col-6"
        >
          <CardProductHome
            key={producto?.id ? producto.id : producto}
            product={producto}
            loading={loading} // si esta cargando, entonces que muestre los paneles de carga
          />
        </Col>
      ))
    );

  return (
    <Col>
      <Form className="search col-12 col-md-6 mb-2">
        <InputGroup>
          <Form.Control
            placeholder="Buscar..."
            aria-label="Buscar..."
            aria-describedby="basic-addon2"
            disabled={loading}
            onChange={(e) => {
              setValueSearch(e.target.value);
            }}
          />
          <Button
            variant="primary"
            id="button-addon2"
            disabled={loading}
            onClick={() => {
              search(valueSearch);
            }}
          >
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
      <Row>{ListaProductos}</Row>
    </Col>
  );
}

export default RowProducts;
