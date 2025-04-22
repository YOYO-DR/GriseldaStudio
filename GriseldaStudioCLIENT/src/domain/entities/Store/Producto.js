import Categoria from "./Categoria";
import BaseClass from "../BaseClass";
import { numeroPrecio } from "../../../helpers/number";
class Producto extends BaseClass {
  constructor({
    id,
    nombre,
    slug,
    precio,
    precio_oferta,
    stock,
    categoria,
    descripcion,
    imagen,
  }) {
    super({ id });
    this.nombre = nombre;
    // se realiza esta validacion, porque cuando intenta crear un producto llegado del localStorage, le duplicaba el precio, dentro de la propiedad precio
    this.precio = precio?.num
      ? precio
      : { num: precio, lectura: numeroPrecio(precio) };
    this.stock = stock;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.precio_oferta = precio_oferta?.num
      ? precio_oferta
      : { num: precio_oferta, lectura: numeroPrecio(precio_oferta) };
    this.slug = slug;
    // validar que la categoria es una instancia de Categoria
    if (categoria instanceof Categoria) {
      this.categoria = categoria;
    } else {
      // aplicar un try catch para validar que sea un objeto
      try {
        this.categoria = new Categoria(categoria);
      } catch (error) {
        console.error("Error al crear la categoria", error);
      }
    }
  }

  toJSON() {
    const {
      id,
      nombre,
      slug,
      precio,
      precio_oferta,
      stock,
      categoria,
      descripcion,
      imagen,
    } = this;

    return {
      id,
      nombre,
      slug,
      precio,
      precio_oferta,
      stock,
      categoria: categoria.toJSON(),
      descripcion,
      imagen,
    };
  }

  // retorna el porcentaje de descuento
  getPorDescuento() {
    if (this.precio_oferta.num <= 0) return 0; // si no hay oferta retorno 0
    const valor = Math.abs(
      ((this.precio_oferta.num - this.precio.num) / this.precio.num) * 100
    );
    return parseFloat(parseInt(valor, 10)) !== valor
      ? valor.toFixed(1)
      : parseInt(valor, 10);
  }

  getPrecio() {
    return this.precio_oferta.num > 0 ? this.precio_oferta : this.precio;
  }
}

export default Producto;
