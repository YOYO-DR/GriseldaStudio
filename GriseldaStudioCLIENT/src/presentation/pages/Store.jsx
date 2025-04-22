import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CardProduct from "../components/Products/CardProducts"
import { obtenerProductos } from "../../api/productos/productos";
import Producto from "../../domain/entities/Store/Producto";
import useError from "../components/hooks/useError";

function Store({ }) {
  const [producto, setProducto] = useState()
  const [error, handleError] = useError();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await obtenerProductos();
        if (data.length !== 0) {
          setProducto(data[0]);
        }
      } catch (error) {
        handleError(error);
      }
    }
    fetchData();
  },[])
  
  return (
    <Layout>
      <CardProduct product={ producto } />
    </Layout>
  );
}

export default Store;