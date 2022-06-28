export const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "User Registered";

    case "auth/invalid-email":
      return "Invalid Email";

    case "auth/user-not-found":
      return "User not found";

    case "auth/wrong-password":
      return "Wrong password";

    default:
      return "server error";
  }
};
