export const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return { code: "email", message: "User Registered" };

    case "auth/invalid-email":
      return { code: "email", message: "Invalid Email" };

    case "auth/user-not-found":
      return { code: "email", message: "User not found" };

    case "auth/wrong-password":
      return { code: "password", message: "Wrong password" };

    default:
      return { code: "password", message: "server error" };
  }
};
