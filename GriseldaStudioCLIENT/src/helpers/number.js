// funcion para poner un numero como algun precio ($1,000,000.00)
function numeroPrecio(num) {
  num = String(parseFloat(num).toFixed(3));

  // Verificar si tiene decimales
  if (num.slice(-4) === '.000') {
    // -4 para quitar el '.'
    num = num.slice(0, -4);
  }

  let decimales = false;

  // Si tiene decimales, guardarlos y también el valor antes del punto
  if (num.includes('.')) {
    decimales = num.split('.')[1];
    num = num.split('.')[0];
  }

  // Separar por miles
  for (let i = num.length - 3; i > 0; i -= 3) {
    num = num.slice(0, i) + ',' + num.slice(i);
  }

  if (decimales) {
    num = num + '.' + decimales.substring(0,3).replace(/\.?0+$/, '');
  }

  return `$ ${num}`;
}

export { numeroPrecio };