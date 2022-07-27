import { useState, useEffect } from "react";

export interface IForm {
    name: string;
    lastname1: string;
    lastname2: string;
    email: string;
    phone: string;
}

const useForm = ({ initState, callback, validator }: any) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({
    name: "",
    lastname1: "",
    lastname2: "",
    email: "",
    phone: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    console.log(Object.values(errors))
    let aux = Object.values(errors).filter(error => typeof error !== "undefined");
    const isValidErrors = () =>
    aux.filter(error => error !== "")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, [errors]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value
    }));
  };

  const handleBlur = (e: any) => {
    const { name: fieldName } = e.target;
    const failFields = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failFields).filter(error => error !== "")[0]
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const failFields = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failFields)[0]
    }));
    setIsSubmited(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    errors
  };
};

export default useForm;
