import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
// import { getAccessToken, getRefreshToken, getUser } from "../hooks/user.actions";
import VARIABLES from "./env_variables";

const axiosBase = axios.create({
  baseURL: VARIABLES.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosBase.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

const axiosService = axios.create({
  // creo una instancia de axios
  baseURL: VARIABLES.API_URL, // la url base de la api
  headers: {
    "Content-Type": "application/json",
  },
});
/*
axiosService.interceptors.request.use(async (config) => {
  // esto es un interceptor, en este caso es para los request, se ejecuta antes de que se haga la solicitud
  /**
  * Recuperar el token de acceso de localStorage y agregarlo a los encabezados de
la solicitud
  */
/*
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

// Interceptor para manejar errores de respuesta, aunque esto es algo que ya se hace por defecto en axios, pero se puede personalizar
axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

// esta funcion se ejecutara cuando el token de acceso haya expirado, osea que reciba un codigo de estado 401 - no autorizado
const refreshAuthLogic = async (failedRequest) => {
  // el failedRequest es la solicitud que fallo, en este caso es la solicitud que fallo por el token de acceso

  // se hace una solicitud para obtener un nuevo token de acceso, como se observa, no se ejcuta con axiosService, sino con axios, ya que axiosService tiene un interceptor que se ejecuta antes de hacer la solicitud, y en este caso no se quiere que se ejecute
  return axios
    .post(
      "/auth/refresh/",
      {
        refresh: getRefreshToken(), //data a enviar
      },
      {
        baseURL: VARIABLES.API_URL, // configuración de la solicitud
      }
    )
    .then((resp) => {
      const { access } = resp.data; // se obtiene el nuevo token de acceso que retorna la petición

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access; // se agrega el nuevo token de acceso a los encabezados de la solicitud que fallo, el cual se ejecutara de nuevo

      localStorage.setItem(
        // y tambien se guarda en el localStorage
        "auth",
        JSON.stringify({
          access,
          refresh: getRefreshToken(),
          user: getUser(),
        })
      );
    })
    .catch(() => {
      // si falla la solicitud para obtener un nuevo token de acceso, se elimina el token de acceso y el token de actualizacion del localStorage
      localStorage.removeItem("auth");
    });
};

// se crea un interceptor para manejar la actualizacion del token de acceso, cada que se ejecute una solicitud y se reciba un codigo de estado 401 - no autorizado, se ejecutara la funcion refreshAuthLogic
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
  // funcion para las peticiones get, se ejecuta con axiosService
  return axiosService.get(url).then((res) => res.data);
}
export default axiosService;

*/
export { axiosBase}