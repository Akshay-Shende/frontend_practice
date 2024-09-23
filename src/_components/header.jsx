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
      </ul>
    </div>
  );
};

export default Header;
