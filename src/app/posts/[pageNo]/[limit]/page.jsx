"use client";
import { useState, useEffect } from "react";
import UserCard from "@/_components/userCard";
import { useSelector, useDispatch } from "react-redux";
import { addPageData } from "@/features/pagination/paginationSlice";
import { FaArrowLeft, FaArrowRight, FaFastBackward, FaFastForward } from 'react-icons/fa';
import {usePathname, useSearchParams} from "next/navigation";

const page = (context) => {

  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pages);
  const pathname = usePathname();
 const searchParams = useSearchParams();
  const { pageNo, limit } = context.params;

  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(pageNo);

  useEffect(() => {
      dispatch(addPageData({ pageNo: pageNo, limit: limit }));
;  }, [page,limit,dispatch]);

useEffect(() => { 
  console.log(pathname +"--->"+searchParams.get("pageNo"));
  
  fetchPost();
},[pageState.limit,pageState.pageNum])

  const fetchPost = async () => {
    if (pageState.pageNo == 0) {
      return
    }
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageState.pageNo}&_limit=${pageState.limit}`
    );
    const newItems = await res.json();
    setItems((prevItem)=>newItems);
    if (newItems.length === 0 || newItems.length < 10) {
    }
    setPageNumber(pageNumber + 1);
  };

  const updatePage = (newPageNo) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, pageNo: newPageNo },
    });}

    const prevPage = () => {
      const newPageNo = Math.max(parseInt(pageNo) - 1, 1);
      updatePage(newPageNo);
    };

    const nextPage = () => updatePage(parseInt(pageNo) + 1);
  return (
    <>
    <div className="grid grid-cols-3 gap-12 justify-center mx-28">
      {items.map((item) => (
        <UserCard title={item.title} description={item.body} />
      ))}
    </div>
    <div className="flex justify-center items-center space-x-4 my-5">
    <button >
      <FaFastBackward /> 
    </button>
    <button  onClick={prevPage}>
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

export default page;
