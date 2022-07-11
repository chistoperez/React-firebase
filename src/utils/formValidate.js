const formValidate = () => {
  return {
    required: { value: true, message: "This field is required" },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Invalid email format",
    },
    patternUrl: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: "Invalid URL format",
    },
    minLength: { value: 6, message: "Password minimum 6 characters" },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "Empty password";
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "Passwords don't match",
      };
    },
  };
};

export default formValidate;
