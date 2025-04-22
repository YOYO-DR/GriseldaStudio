import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

function useError() {
  const [error, setError] = useState(null);

  // UseEffect para lanzar el error
  useEffect(() => {
    if (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).then(() => {
        setError(null);
      });
    }
  }, [error]);

  const handleError = (error) => {
    setError(error);
  };

  return { error, handleError };
}

export default useError;