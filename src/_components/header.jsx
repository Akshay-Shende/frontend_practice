"use client";
import NavLink from "./navLink";

const Header = () => {
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
        <li className="px-4">
          <NavLink href={"/sdc"}> Login</NavLink>
        </li>
        </div>
      </ul>


    </div>
  );
};

export default Header;
