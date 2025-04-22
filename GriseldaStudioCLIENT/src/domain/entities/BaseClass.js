class BaseClass {
  constructor({ id="" }={}) { // por si no se recibe un id, asi paso el valor por defecto
    this.id = id;
  }

  toJSON() {
    return JSON.stringify(this);
  }
}

export default BaseClass;
