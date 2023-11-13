export const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegex.test(value) ? "Invalid email address" : undefined;
  };
  
export const validatePasswordLength = (value) => {
  return value.length < 6 || value.length > 40
    ? "Password must be between 6 and 40 characters."
    : undefined;
};

export const validatePasswordSymbols = (value) => {
  const symbolRegex = /[@#$%^&+=-_'.!]/;
  return !symbolRegex.test(value)
    ? "Password must include at least 1 special symbol."
    : undefined;
};

export const validatePassword = (value) => {
  const lengthError = validatePasswordLength(value);
  if (lengthError) {
    return lengthError;
  }

  const symbolError = validatePasswordSymbols(value);
  if (symbolError) {
    return symbolError;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{1,}$/;
  return !passwordRegex.test(value)
    ? "Password must include 1 uppercase letter and 1 number."
    : undefined;
};