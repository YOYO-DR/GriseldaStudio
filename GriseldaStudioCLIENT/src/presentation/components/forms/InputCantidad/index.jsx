import { InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import style from "./InputCantidad.module.css";

function InputCantidad({ value, setValue, maxValue }) {
  const handleIncrease = () => {
    // Funcion para aumentar el valor
    if (value >= maxValue) return; // Si el valor es mayor o igual al maximo, no se aumenta
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrease = () => {
    // Funcion para disminuir el valor, y si es menor a 0, se pone en 0
    setValue((prevValue) => Math.max(prevValue - 1, 1)); // Evitar valores negativos, la funcion max devuelve el valor mas grande, al resta 1 la valor anterior, si da menos que 0, retorna 0 y se evita numeros negativos
  };

  const handleChange = (event) => {
    // Funcion para cambiar el valor, si no es un numero, se pone en 0
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue !== "") {
      // isNaN devuelve true si no es un numero, si es un numero, se cambia el valor
      let numValor = parseInt(newValue, 10);
      if (numValor > maxValue) {
        setValue(maxValue);
        return;
      } // Si el valor es mayor al maximo, se pone en el maximo
      setValue(numValor); // parseInt convierte el string a un numero entero, y se especifica el radix 10
    } else {
      setValue(0); // Si no es un numero, se pone en 0
    }
  };

  return (
    <InputGroup className={`mb-3 ${style.none_min_with}`}>
      <Button
        variant="outline-danger"
        id="button-addon1"
        onClick={handleDecrease}
      >
        <i className="fas fa-minus"></i>
      </Button>
      <Form.Control
        aria-label="Amount (to the nearest dollar)"
        value={value}
        onChange={handleChange}
        className="text-center"
      />
      <Button
        variant="outline-success"
        id="button-addon2"
        onClick={handleIncrease}
      >
        <i className="fas fa-plus"></i>
      </Button>
    </InputGroup>
  );
}

export default InputCantidad;
