import Producto from "../../domain/entities/Store/Producto";
import { axiosBase } from "../axios";

function obtenerProductos() {
  return axiosBase
    .get("/productos/")
    .then((res) => res.data) // retornar solo la data
    .then((data) => {
      // preguntar si trajo resultados y retornarlos
      if (data.length > 0) {
        return {status:1,data:data.map((producto) => new Producto({ ...producto }))};
      }
      return {status:1,data:[]};
    })
    .catch((error) => {
      console.error(error);
      return {status:0,data:[]};
    });
}

function obtenerProducto(slug,setError) {
  return axiosBase
    .get(`/productos/${slug}/`)
    .then((res) => res.data)
    .then((data) => {
      return new Producto(data);
    })
    .catch((e) => {
      const error = {
        mensaje: e.response?.data.detail,
        status: e.response?.status
      }
      setError(error)
    });
}

export { obtenerProductos, obtenerProducto };
