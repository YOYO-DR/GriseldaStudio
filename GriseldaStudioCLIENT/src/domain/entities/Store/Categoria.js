import BaseClass from "../BaseClass";

class Categoria extends BaseClass {
  // si alguno no es obligatorio, se pone
  // constructor( { id, nombre="", slug="", descripcion }={} )
  constructor({ id, nombre, slug, descripcion }) {
    super({id})
    this.nombre = nombre;
    this.slug = slug;
    this.descripcion = descripcion;
  }

  toJSON() {
    const { id, nombre, slug, descripcion } = this;
    return { id, nombre, slug, descripcion };
  }
}

export default Categoria;
