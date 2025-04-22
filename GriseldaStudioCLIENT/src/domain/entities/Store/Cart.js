import Producto from "./Producto.js";
import BaseClass from "../BaseClass.js";
import { numeroPrecio } from "../../../helpers/number.js";

class CartItem extends BaseClass {
  constructor({ product, quantity }) {
    super();
    // verificar que el producto sea una instancia de Producto
    if (product instanceof Producto) {
      this.product = product;
    } else {
      // aplicar un try catch para validar que sea un objeto
      try {
        this.product = new Producto({ ...product });
      } catch (error) {
        console.error("Error al crear el producto", error);
      }
    }
    this.quantity = quantity;
  }

  toJSON() {
    const { product, quantity } = this;
    return {
      product: product.toJSON(),
      quantity,
    };
  }

  setQuantity(quantity) {
    // asignar la cantidad del producto
    this.quantity = quantity;
  }

  getSubTotal() {
    // obtener el subtotal del producto
    return {
      num: this.product.getPrecio().num * this.quantity,
      lectura: numeroPrecio(this.product.getPrecio().num * this.quantity),
    };
    
  }
}

class Cart extends BaseClass {
  constructor({ items = [] } = {}) {
    super();
    // Arreglo de CartItems
    this.items = items || []; // si items es falsy, se asigna un arreglo vacio

    this.getCart();
  }

  toJSON() {
    // para convertir los valores en objeto y luego poder guardarlos en el localstorage
    const { id, items } = this;
    return { id, items: items.map((item) => item.toJSON()) };
  }

  getCart() {
    const valorCart = localStorage.getItem("cart");

    const storedCart = valorCart
      ? JSON.parse(localStorage.getItem("cart"))
      : null; // si no hay nada en el localstorage, se asigna null

    if (!storedCart) {
      // si no hay nada en el carrito, se guarda un carrito
      this.save();
      return;
    }

    // si no hay nada en el carrito o no hay un carrito, se crea un carrito vacio
    const storedItems = storedCart.items.map(
      (item) => new CartItem({ ...item })
    ); // mapear los items del carrito

    this.items = storedItems;
    this.save();
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.toJSON()));
  }

  addItem(item) {
    // agregar un item al carrito

    if (!(item instanceof CartItem)) {
      throw new Error("El item no es una instancia de CartItem");
    }

    // Si el carrito esta vacio, se agrega el item
    if (this.items.length === 0) {
      // valido que el quantity no sea mayor al stock
      if (item.quantity > item.product.stock) {
        return [false, "La cantidad supera el stock disponible"];
      }
      // agrego el item al carrito
      this.items.push(item);
      this.save();
      return [true, "Carrito actualizado correctamente"];
    }

    // busco el item en el carrito
    const found = this.items.find(
      (valor) => valor.product.id === item.product.id
    );

    // Si no se encontro el item, se agrega al carrito
    if (!found) {
      // valido que el quantity no sea mayor al stock
      if (item.quantity > item.product.stock) {
        return [false, "La cantidad supera el stock disponible"];
      }
      this.items.push(item);
      this.save();
      return [true, "Carrito actualizado correctamente"];
    }

    // Utilizo el map para reemplzara el arreglo base, diciendole que si el valor es igual al valor o item a agregar, se sume la cantidad
    // variable para validar si no se paso del stock
    let pasoStock = false;
    this.items = this.items.map((valor) => {
      if (valor.product.id === item.product.id) {
        // valido que la cantidad no sea mayor al stock
        if (valor.quantity + item.quantity > item.product.stock) {
          pasoStock = true;
          return valor;
        }
        valor.quantity += item.quantity;
        return valor; // retorno el valor modificado
      }
      return valor; // si no coincide, retorno el item normal
    });

    if (pasoStock) {
      return [
        false,
        "La cantidad seleccionada, más la cantidad en el carrito supera el stock disponible",
      ];
    }

    this.save(); // guardo
    return [true, "Carrito actualizado correctamente"];
  }

  deleteItem(item) {
    if (!(item instanceof CartItem)) {
      throw new Error("El item no es una instancia de CartItem");
    }
    // Elimino el item del carrito
    this.items = this.items.filter(
      (valor) => valor.product.id !== item.product.id
    );

    this.save(); // guardo
  }

  getCantidad() {
    // obtengo el total de productos en el carrito
    return this.items.length;
  }

  getItem(id) {
    this.getCart();
    // obtener un item por su id
    return this.items.find((item) => item.product.id === id);
  }

  getTotal() {
    // validar que hayan items en el carrito
    if (this.items.length === 0) {
      return { num: 0, lectura: "$ 0" };
    }

    // obtener el total del carrito
    const num = this.items.reduce((total, item) => {
      return total + item.product.getPrecio().num * item.quantity;
    }, 0);
    return { num: num, lectura: numeroPrecio(num) };
  }

  clear() {
    // limpiar el carrito
    this.items = [];
    this.save();
  }
}
export default Cart;
export { CartItem };
