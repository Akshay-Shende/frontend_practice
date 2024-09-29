"use client";
import { useEffect } from "react";
import NavLink from "./navLink";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addLogInUser, deleteLogInUser } from "@/features/logInUser/logInUserSlice";
import { account } from "@/app/appWrite";
import { useRouter } from "next/navigation";

const Header = () => {
  const [userId, setUserId] = useState(0);
  const user = useSelector((state) => state.logInUserReducer.user.id);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    setUserId(user);
  },[user]);

  const logoutHandler = async () => {
    try {
      await account.deleteSession("current");
     dispatch(deleteLogInUser());
     localStorage.removeItem("persist:root");
     router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-slate-800 text-white h-14">
      <ul className="flex justify-center items-center h-full">
        <li className="px-4 ">
          <NavLink href={"/home-page"}>Home</NavLink>
        </li>
        <li className="px-4">
          <NavLink href={"/users-data"}> Users</NavLink>
        </li>
        <li className="px-4">
          <NavLink href={"/posts"}> Posts</NavLink>
        </li>
        <div className="flex justify-end items-end">
          <li className="px-4 ">
            <NavLink href={"/xyz"}>Home</NavLink>
          </li>
          {userId == 0 ? (
            <li className="px-4">
              <NavLink href={"/login"}> Login</NavLink>
            </li>
          ) : (
            <li className="px-4 cursor-pointer" onClick={logoutHandler}>
               LogOut
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Header;
