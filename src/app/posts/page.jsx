"use client";
import { useState, useEffect } from "react";
import UserCard from "@/_components/userCard";
import { usePathname, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaFastBackward, FaFastForward } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const Page = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
    const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNo = searchParams.get("page");
  const limit = searchParams.get("limit");

  useEffect(() => {
    console.log(pageNo +"--"+limit);
    
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNo}&_limit=${limit}`
    );
    const newItems = await res.json();
    setItems((prevItems) => [...prevItems, ...newItems]);
    if (newItems.length === 0 || newItems.length < 10) {
    
    }
    setPage(page + 1);
  };

  const nextPage = () => {
    console.log(router);
    
    const updatedPage = parseInt(searchParams.get('page') || '1') + 1;

    router.push(`${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: updatedPage })}`);
  };

  const prevPage = () => {
    const updatedPage = parseInt(searchParams.get('page') || '1') - 1;
    router.push(`${pathname}?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: updatedPage })}`);
  
  };
  return (
    <>
    <div className="grid grid-cols-3 gap-12 justify-center mx-28">
      {items.map((item) => (
        <UserCard key={item.title} title={item.title} description={item.body} />
      ))}
    </div>
    <div className="flex justify-center items-center space-x-4 my-5">
    <button >
      <FaFastBackward /> 
    </button>
    <button onClick={prevPage} >
      <FaArrowLeft /> 
    </button>
    <button onClick={nextPage}>
      <FaArrowRight />
    </button>
    <button >
      <FaFastForward /> 
    </button>
  </div>
    <div className="grid grid-cols-3 gap-12 justify-center mx-28">
      {items.map((item) => (
        <UserCard title={item.title} description={item.body} />
      ))}
    </div>
    <div className="flex justify-center items-center space-x-4 my-5">
    <button >
      <FaFastBackward /> 
    </button>
    <button onClick={prevPage} >
      <FaArrowLeft /> 
    </button>
    <button onClick={nextPage}>
      <FaArrowRight />
    </button>
    <button >
      <FaFastForward /> 
    </button>
  </div>
    </>
  );
};

export default Page;
