import { useState } from "react";

function useFormInputv2(
  initialValue,
  validator = () => true,
  formatter = null
) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    let newValue = event.target.value;
    //Apply formatter if exists
    if (formatter) {
      newValue = formatter(newValue);
    }

    setValue(newValue);
    setIsValid(validator(newValue));
  };

  const handleBlur = () => {
    setIsValid(validator(value));
  };

  const resetValue = () => {
    setValue(initialValue);
    setIsValid(true);
  };

  const setInitialValue = (newInitialValue) => {
    setValue(newInitialValue);
  };

  return {
    value: value || "",
    isValid,
    onChange: handleChange,
    onBlur: handleBlur,
    resetValue,
    setInitialValue,
  };
}
export default useFormInputv2;
