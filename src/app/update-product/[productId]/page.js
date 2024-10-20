"use client";
import AddProduct from "@/_components/addProduct";
import { useParams } from "next/navigation";

const Page = () => {
  const { productId } = useParams();
  return (
    <>
    {typeof productId == "string" ? (
      <AddProduct productPropsId={productId} />
    ) : (
     alert("Product not found")
    )} 
    </>
  );
};
export default Page;
