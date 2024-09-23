"use client";
import {usePathname, useSearchParams} from "next/navigation";
import { useEffect } from "react";
export default function Home() {
 // const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const page = searchParams.get('page');    // returns '2'
const filter = searchParams.get('filter'); // returns 'popular'

  useEffect(() => {
    console.log(pathname +"--->"+searchParams.get("pageNo"));
    console.log(page + "--->" + filter);
    
    
   })
  return (
<div className="flex justify-center items-center space-x-4">

    </div>
  );
}
