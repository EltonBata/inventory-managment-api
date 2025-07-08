import { useState } from "react";

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

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
