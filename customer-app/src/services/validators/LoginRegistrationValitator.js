export const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegex.test(value) ? "Invalid email address" : undefined;
  };
  
  export const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=-_'.!]).{6,40}$/;
    return !passwordRegex.test(value)
      ? "Password must be 6-40 characters and include 1 special symbol, 1 uppercase letter, and 1 number."
      : undefined;
  };