import VARIABLES from "../api/env_variables";
import Cart from "../domain/entities/Store/Cart";

import { numeroPrecio } from "./number";

function getMensajeWhatsappCart() {
  const carrito = new Cart();

  let mensajeItems =
    "Hola, buen día\nQuiero comprar los siguientes productos de GriseldaStudio\n";
  for (const item of carrito.items) {
    mensajeItems += `* ${item.product.nombre} X ${
      item.quantity
    } unidades por valor de ${item.getSubTotal().lectura} (Unidad ${
      item.product.getPrecio().lectura
    })\n`;
  }
  return `https://wa.me/${VARIABLES.NUM_WHATSAPP}?text=${encodeURIComponent(
    mensajeItems
  )}\nPor un total de ${carrito.getTotal().lectura}`;
}

function getMensajeWhatsappProd(producto, cantidad) {
  let mensaje = `Hola, buen día\nQuiero comprar ${
    cantidad > 1 ? cantidad + " unidades d" : ""
  }el producto ${producto.nombre}\n Por valor total de ${
    cantidad > 1
      ? numeroPrecio(producto.getPrecio().num * cantidad)
      : producto.getPrecio().lectura
  }`;

  return `https://wa.me/${VARIABLES.NUM_WHATSAPP}?text=${encodeURIComponent(
    mensaje
  )}`;
}

export default getMensajeWhatsappCart;
export { getMensajeWhatsappProd };
