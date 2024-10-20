"use client";
import {
  Table,
  TableBody,
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
import { useDispatch } from "react-redux";
import { decreaseCartCount } from "@/features/cart/cartSlice";
import { useSelector } from "react-redux";

const Page = () => {
  const { getCartAndProductByUserId, deleteCart } = useCart();
  const { loading, setLoading } = useContext(LoadingContext);
  const [result, setResult] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cartReducer.cartCount);

  const removeFromCart = async (id) => {
    console.log("remove from cart", id);
    setLoading(true);
    const cartResult = await deleteCart(id);
    dispatch(decreaseCartCount());
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      let result = await getCartAndProductByUserId(String(userId));
      setResult(result);
      // Calculate the total price here using reduce function
      const calculatedTotal = result.reduce((acc, item) => {
        return acc + item.Qty * parseFloat(item.productDetails.ProductPrice);
      }, 0);

      setTotalPrice(calculatedTotal);
      setLoading(false);
    })();
  }, [cartCount]);

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
                <button
                  className="ms-3 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                  onClick={() => removeFromCart(item.$id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <strong>Total Price : {totalPrice.toFixed(2)} </strong>
      </div>
      <button className="my-2 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
        Buy
      </button>
    </div>
  );
};

export default Page;
