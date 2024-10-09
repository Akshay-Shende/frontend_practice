"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import useCart from "@/appwriteServices/cartServices";
import { LoadingContext } from "@/context/loadingContext";
import Spinner from "@/_components/spinner";

const Page = () => {
  const { getCartAndProductByUserId, getCartAndProductByUser } = useCart();
  const { loading, setLoading } = useContext(LoadingContext);
  const [result, setResult] = useState([]);

  const { userId } = useParams();
  useEffect(async () => {
    setLoading(true);
    let result = await getCartAndProductByUserId(String(userId));
    setResult(result);
    setLoading(false);
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="px-14">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((item, index) => (
            <TableRow key={item.$id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.productDetails.ProductName}</TableCell>
              <TableCell>{item.Qty}</TableCell>
              <TableCell>{item.productDetails.ProductPrice}</TableCell>
              <TableCell>
                {item.Qty * parseFloat(item.productDetails.ProductPrice)}
              </TableCell>
              <TableCell className="text-right">
                <button className="my-2 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
                  Buy
                </button>
                <button className="ms-3 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
