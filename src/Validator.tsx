import { IForm } from "./useForm";

export const validator = (values: IForm, fieldName: string) => {
  let errors = {
    name: "",
    lastname1: "",
    lastname2: "",
    email: "",
    phone: "",
  };
  switch (fieldName) {
    case "name":
        validateName(values.name, errors);
        break;
    case "lastname1":
        validateLastName1(values.lastname1, errors);
        break;
    case "lastname2":
        validateLastName2(values.lastname2, errors);
        break;
    case "email":
      validateEmail(values.email, errors);
      break;
    case "phone":
      validatePhoneNumber(values.phone, errors);
      break;
    default:
  }
  return errors;
};

function validateEmail(email: string, errors: IForm) {
  let result = true;

  if (!email) {
    errors.email = "Ingrese un correo";
    result = false;
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = regex.test(String(email).toLowerCase());
    if (!result) errors.email = "Ingrese un correo válido";
  }
  return result;
}

function validateName(name: string, errors: IForm) {
    let result = true;
  
    if (!name) {
      errors.name = "Ingrese un nombre";
      result = false;
    } else {
      var regex = /^[a-zA-Z][a-zA-Z.\s-]{0,100}$/;
      result = regex.test(name);
  
      if (!result) {
        errors.name = "Ingrese un nombre válido";
        result = false;
      } else if (name.length > 100) {
        errors.name = "Máximo 100 caracteres.";
        result = false;
      }
    }
  
    return result;
}

function validateLastName1(lastname1: string, errors: IForm) {
    let result = true;
  
    if (!lastname1) {
      errors.lastname1 = "Ingrese un apellido";
      result = false;
    } else {
      var regex = /^[a-zA-Z][a-zA-Z.\s-]{0,100}$/;
      result = regex.test(lastname1);
  
      if (!result) {
        errors.lastname1 = "Ingrese un apellido válido";
        result = false;
      } else if (lastname1.length > 100) {
        errors.lastname1 = "Máximo 100 caracteres.";
        result = false;
      }
    }
  
    return result;
}

function validateLastName2(lastname2: string, errors: IForm) {
    let result = true;
  
    if (!lastname2) {
      errors.lastname2 = "Ingrese un apellido";
      result = false;
    } else {
      var regex = /^[a-zA-Z][a-zA-Z.\s-]{0,100}$/;
      result = regex.test(lastname2);
  
      if (!result) {
        errors.lastname2 = "Ingrese un apellido válido";
        result = false;
      } else if (lastname2.length > 100) {
        errors.lastname2 = "Máximo 100 caracteres.";
        result = false;
      }
    }
  
    return result;
}

function validatePhoneNumber(phone: string, errors: IForm) {
    let result = true;
  
    if (!phone) {
      errors.phone = "Ingrese un número de teléfono";
      result = false;
    } else {
      var regex = /^[0-9]{8}$/;
      result = regex.test(phone);
  
      if (!result) {
        errors.phone = "Ingrese un número de teléfono válido";
        result = false;
      }
    }
  
    return result;
}

