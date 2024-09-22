"use client";
import { useState, useEffect } from "react";
import UserCard from "@/_components/userCard";
const page = () => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const newItems = await res.json();
    setItems((prevItems) => [...prevItems, ...newItems]);
    if (newItems.length === 0 || newItems.length < 10) {
      setHasMore(false);
    }
    setPage(page + 1);
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
