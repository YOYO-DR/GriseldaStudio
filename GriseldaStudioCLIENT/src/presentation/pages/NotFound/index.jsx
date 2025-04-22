import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import style from "./NotFound.module.css";

function PageNotFound() {
  const location = useLocation(); // para obtener la ruta actual de manera más reactiva
  const pathname = location.pathname.replace("/", "");

  const mensajes_base = {
    pageNotFound: {
      mensaje: "404 - Página no encontrada",
      to: { pathname: "/", mensaje: "Ir al inicio" },
    },
    resourceNotFound: {
      mensaje: "404 - El recurso que busca no existe o no se pudo encontrar.",
      to: { pathname: "/", mensaje: "Ir a la tienda" },
    },
  };

  const { mensaje, to } = pathname !== "404"
    ? mensajes_base.pageNotFound
    : mensajes_base.resourceNotFound; // Utilizo la destructuracion para obtener el mensaje y el to segun sea el caso

  return (
    <Layout>
      <div className={`d-flex flex-column align-items-center justify-content-center h-100`}>
        <h1 className="mb-2 text-center">{mensaje}</h1>
        <Link to={to.pathname}>{to.mensaje}</Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
