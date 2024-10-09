"use client";
import useAuth from "@/appwriteServices/auth";
import { useEffect, useState, useContext } from "react";
import UserTable from "@/_components/userTable";
import { LoadingContext } from "@/context/loadingContext";
import useDebouncing from "@/customHooks/useDebouncing";
import Spinner from "@/_components/spinner";

const Page = () => {
  const { allUsers, allUserBySearch } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);

  const debouncedSearchTerm = useDebouncing(searchTerm);

  useEffect( () => {
    (async()=>{
      setLoading(true);
      if (!debouncedSearchTerm) {
        console.log("with empty string");
        
        const resultData = await allUsers();
        setUsers((e) => resultData.users);
        setLoading(false);
      }else{
        setLoading(true);
      const resultData = await allUserBySearch(debouncedSearchTerm);
      setUsers((e) => resultData.users);
      setLoading(false);
      }})()
   
  }, [debouncedSearchTerm]);

  if(loading)  return <Spinner/>
  return (<div>
    <div className="flex justify-center items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-3 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
        <p className="text-gray-500 ml-5 ms-4">{users?.length} results found</p>
      </div>
    <UserTable users={users} />
  </div>);
};

export default Page;
