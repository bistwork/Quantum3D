import { useState } from "react";

function useFormInput(initialValue, validator = () => true, formatter = null) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false);

  const handleChange = (event) => {
    let newValue = event.target.value;

    if (formatter) {
      newValue = formatter(newValue);
    }

    setValue(newValue);
    if (shouldValidateOnChange) {
      const newValidation = validator(newValue);
      setIsValid(newValidation);
      if (newValidation) setShouldValidateOnChange(false);
    }
  };

  const triggerOnChangeValidation = () => {
    setShouldValidateOnChange(true);
    setIsValid(false);
  };

  const resetValue = () => {
    setValue(initialValue);
    setIsValid(true);
    setShouldValidateOnChange(false);
  };

  const setInitialValue = (newInitialValue) => {
    setValue(newInitialValue);
  };

  return {
    value: value || "",
    isValid,
    onChange: handleChange,
    resetValue,
    setInitialValue,
    triggerOnChangeValidation,
  };
}

export default useFormInput;
