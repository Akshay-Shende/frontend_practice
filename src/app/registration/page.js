"use client";
import { useEffect, useState } from "react";
import useAuth from "@/appwriteServices/auth";
import useRoles from "@/appwriteServices/roleServices";
import { account } from "../appWrite";

const Page = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [mobile, setMobile]     = useState("+91");
  const [roles, setRoles]       = useState([]);
  const [role, setRole]         = useState(null);

  const { registerUser } = useAuth();
  const { getRoles } = useRoles();

  useEffect(() => {
    (async () => {
      try {
        const roles = await getRoles();
        setRoles(roles.documents);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    })(); // Immediately invoking the async function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //need to revisit this code for logger implementation
    console.log(role);
    
    await registerUser(email, mobile, password, name,role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="text"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          pattern="+[0-9]{13}"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="role"
          >
            Select Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select a role --
            </option>
            {roles.map((role) => (
              <option key={role.RoleCode} value={role.Name}>
                {role.Name}
              </option>
            ))}
          </select>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
