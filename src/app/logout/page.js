"use client"
import { useSelector, useDispatch } from "react-redux";
import { account } from "@/app/appWrite";
const Page = () => {
  let dispatch =  useDispatch();
    const logoutHandler = async () => {
        try {
          await account.deleteSession("current");
          dispatch(deleteLogInUser());
          localStorage.removeItem("persist:root");
         
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Page
