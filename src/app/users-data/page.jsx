"use client";
import SelectOptions from "@/_components/selectOptions";
import UserTable from "@/_components/userTable";
import { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [masterUsers, setMasterUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
    console.log(searchTerm);
  }, [searchTerm]);

  const fetchUsers = async () => {
    const res = await fetch("https://randomuser.me/api/?results=50");
    const data = await res.json();
    setUsers(data.results);
    setMasterUsers(data.results);
  };

  const filterUsers = () => {
    setUsers(() =>
      masterUsers.filter((user) =>
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase())  ||
        user.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-3 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
        <p className="text-gray-500 ml-5 ms-4">{users.length} results found</p>
      </div>
      <UserTable users={users} />
    </>
  );
};

export default page;
