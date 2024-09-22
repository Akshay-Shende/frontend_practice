"use client";
import { useState, useEffect } from "react";
import UserCard from "@/_components/userCard";
import { useRouter } from 'next/navigation'


const page = (context) => {

    const router = useRouter();
    const { page, limit } = context.params;
    
    const [hasMore,setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(page);
  useEffect(() => {
    console.log(page+"----->"+limit);
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${limit}`
    );
    const newItems = await res.json();
    setItems((prevItems) => [...prevItems, ...newItems]);
    if (newItems.length === 0 || newItems.length < 10) {
      setHasMore(false);
    }
    setPageNumber(pageNumber + 1);
  };
  return (
    <div className="grid grid-cols-3 gap-12 justify-center mx-28">

       {items.map((item) => (
          <UserCard 
            title={item.title} 
            description={item.body}
          />
        ))}
    </div>
  );
};

export default page;
