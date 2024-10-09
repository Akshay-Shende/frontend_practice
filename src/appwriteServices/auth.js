import { useState } from "react";
import { account, ID } from "@/app/appWrite";
import { Users, Client } from "node-appwrite";
import conf from "@/app/configue/configue";


const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [name, setName]                 = useState("");



  const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(conf.appwriteAPIKey);

  const users = new Users(client);

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const registerUser = async (email, phone, password, name, role) => {
    try {
      console.log("role in registerUser",role);
      
     let user =  await users.create(ID.unique(), email, phone, password, name);
      await users.updatePrefs(user.$id,{
        Role: role
      });
      await login(email, password);

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

  const allUsers = async () => {
    try {
      const usersData = await users.list();
      return usersData;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return [];
    }
  };

  const allUserBySearch = async (searchTerm) => {
    try {
      const usersData = await users.list([], searchTerm);
      return usersData;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return [];
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
    allUsers,
    allUserBySearch,
  };
};

export default useAuth;
