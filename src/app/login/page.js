"use client";
import { useState, useContext } from "react";
import useAuth from "@/appwriteServices/auth";
import { useSelector, useDispatch } from "react-redux";
import { account } from "../appWrite";
import { useRouter } from "next/navigation";
import {
  addLogInUser,
  deleteLogInUser,
} from "@/features/logInUser/logInUserSlice";
import NavLink from "@/_components/navLink";
import { LoadingContext } from "@/context/loadingContext";
import Spinner from "@/_components/spinner";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let loginResult = await login(email, password);
    setLoading(false);
    dispatch(
      addLogInUser({
        name: loginResult.name,
        email: loginResult.email,
        phone: loginResult.phone,
        $id: loginResult.$id,
      })
    );
    if (true) {
      router.push("/home-page");
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink href={"/registration"}>Sign up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Page;
