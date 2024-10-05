"use client";
import { useEffect } from "react";
import NavLink from "./navLink";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addLogInUser,
  deleteLogInUser,
} from "@/features/logInUser/logInUserSlice";
import { account } from "@/app/appWrite";
import { useRouter } from "next/navigation";
import SelectOptions from "./selectOptions";

const Header = () => {
  const [userData, setUserData] = useState(0);
  const [firstName, setFirstName] = useState("");
  const user = useSelector((state) => state.logInUserReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    user.name ? setFirstName(user.name.split(" ")[0]) : setFirstName("");
    setUserData(user);
  }, [user]);

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

  if (userData.role === "superAdmin") {
    return (
      <div className="bg-slate-800 text-white h-14">
        <ul className="flex justify-center items-center h-full">
          <li className="px-4 ">
            <NavLink href={"/home-page"}>Home</NavLink>
          </li>
          <li className="px-4">
            <NavLink href={"/users-data"}> Users</NavLink>
          </li>

          {/* <li className="px-4">
            <NavLink href={"/users-data"}> Add On</NavLink>
          </li> */}
          <li>
            <select
              className="bg-slate-800 text-white h-14 border-none outline-none"
              onChange={(e) => {
                let selectedValue = e.target.value;
                if (selectedValue) {
                  window.location.href = selectedValue;
                }
              }}
            >
              <option value="">Add On</option>
              <option value="product-registration">Add Product</option>
              <option value="add-manufacturer">Add Manufacturer</option>
              <option value="add-role">Add Role</option>
            </select>
          </li>

          <li className="px-4">
            <NavLink href={"/posts"}> Posts</NavLink>
          </li>
          <li className="px-4">
            <NavLink href={"/about-us"}>About Us</NavLink>
          </li>
          <div className="flex justify-end items-end">
            {userData.id == 0 ? (
              <li className="px-4">
                <NavLink href={"/login"}> Login</NavLink>
              </li>
            ) : (
              <>
                <li className="px-4 cursor-pointer">Hello {firstName}</li>
                <li className="px-4 cursor-pointer" onClick={logoutHandler}>
                  Log Out
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    );
  }

  if (userData.role === "Customer") {
    return (
      <div className="bg-slate-800 text-white h-14">
        <ul className="flex justify-center items-center h-full">
          <li className="px-4 ">
            <NavLink href={"/home-page"}>Home</NavLink>
          </li>
        
         <li className="px-4">
            <NavLink href={"/about-us"}>About Us</NavLink>
          </li>

          <li className="px-4">
            <NavLink href={"/wishlist"}>WishList</NavLink>
          </li>

          <li className="px-4">
            <NavLink href={"/cart"}>Cart</NavLink>
          </li>

          <div className="flex justify-end items-end">
            {userData.id == 0 ? (
              <li className="px-4">
                <NavLink href={"/login"}> Login</NavLink>
              </li>
            ) : (
              <>
                <li className="px-4 cursor-pointer">Hello {firstName}</li>
                <li className="px-4 cursor-pointer" onClick={logoutHandler}>
                  Log Out
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    );
  }

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
        <li className="px-4 ">
          <NavLink href={"/about-us"}>About Us</NavLink>
        </li>
        <div className="flex justify-end items-end">
          {userData.id == 0 ? (
            <li className="px-4">
              <NavLink href={"/login"}> Login</NavLink>
            </li>
          ) : (
            <>
              <li className="px-4 cursor-pointer">Hello {firstName}</li>
              <li className="px-4 cursor-pointer" onClick={logoutHandler}>
                Log Out
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Header;
