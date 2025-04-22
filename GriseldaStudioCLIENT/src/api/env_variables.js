const dom_react = "https://gstudio.yoyodr.dev" // ruta de la app de react principal

const host = window.location.host;

const VARIABLES = { // Le indico la ruta de la API dependiendo de si estoy en localhost o en el dominio de la app de react
  "API_URL" : host.includes("localhost") ? "http://localhost:8000/api" : "https://gstudioapi.yoyodr.dev",
}
 // Si no estoy en localhost o en la app de react principal, entonces estoy en la app de react de pruebas, entonces le indico la ruta de la API de pruebas
// if (!host.includes(dom_react) && !host.includes("localhost")) {
//   VARIABLES["API_URL"] = "http://localhost:8000/api"
// }

VARIABLES["NUM_WHATSAPP"] = "573148743538"; // Numero de whatsapp de la tienda

export default VARIABLES;