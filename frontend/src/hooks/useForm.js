import { useState } from "react";

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => {
      if (type === "checkbox") {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];

        if (checked) {
          // Adiciona o valor se ainda não estiver presente
          return {
            ...prev,
            [name]: [...currentArray, value],
          };
        } else {
          // Remove o valor se for desmarcado
          return {
            ...prev,
            [name]: currentArray.filter((item) => item !== value),
          };
        }
      }

      // Para outros tipos de input
      return {
        ...prev,
        [name]: value,
      };
    });

    resetError(name);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors(initialValues);
  };

  const resetError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return { values, handleChange, resetForm, errors, setErrors };
}
