import { useState } from "react";

const useInput = (initialValue, rules, opts = {}) => {

  const options = Object.assign({}, opts);

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const onChange = (e) => {
    if(typeof e === "string"){
      return setValue(e);
    }
    
    setValue(e.target.value + "");
  };

  const onFocus = () => {
    setError(false);
  };

  const checkError = () => {
    setError(false);
    const containsError = runValidation();

    if(containsError){
      setError(containsError);
    }

    return containsError === false;
  };

  const runValidation = () => {
    const runRules = rules.map(rule => rule(value));
    const containsError = runRules.find(v => typeof v === "string") || false;
    return containsError;
  };

  const isValid = () => {
    return checkError();
  };


  return {
    model: {
      value,
      onChange: onChange,
      onFocus: onFocus,
      error
    },
    isValid,
    value,
    setValue,
    setError,
    error,
    hasError: error && error.length > 0
  };
};

export const checkInputs = (arrInput) => {
  return arrInput.map(x => x.isValid()).some(x => !x);
};

export default useInput;