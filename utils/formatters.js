const formatters = {
  phoneFormatter: (value) => {
    value = value.replace(/\D/g, ""); //Delete everything that is not a number
    value = value.slice(0, 10); // 10 digits limit

    if (value.length > 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    return value;
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  numberOnlyFormatter: (value) => {
    return value.replace(/\D/g, ""); // Elimina todo lo que no sea un número
  },
  removeNumbers: (value) => {
    return value.replace(/[0-9]/g, ""); // delete all the numbers from the string.
  },
};

export default formatters;
