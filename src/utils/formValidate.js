const formValidate = (getValues) => {
  return {
    required: { value: true, message: "This field is required" },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Invalid email format",
    },
    minLength: { value: 6, message: "Password minimum 6 characters" },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "No spaces";
        return true;
      },
    },
    validateEquals(getValues) {
      return {
        equals: (v) => v === getValues("password") || "Passwords don't match",
      };
    },
  };
};

export default formValidate;
