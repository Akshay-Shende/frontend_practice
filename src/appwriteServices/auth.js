import { useState } from "react";
import { account,ID } from "@/app/appWrite";
const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const registerUser = async (email, password, name) => { 
    try {
console.log("Email:", email);
console.log("Password:", password);
console.log("Name:", name);

let phone = "+911234567890";
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      // await account.updatePrefs({
      //   phoneNumber: phone
      // });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    loggedInUser,
    email,
    password,
    name,
    login,
    registerUser,
    logout,
  };
};

export default useAuth;
