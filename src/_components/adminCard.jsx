import useFiles from "@/appwriteServices/fileServices";
import useWishlist from "@/appwriteServices/wishlistServices";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useCart from "@/appwriteServices/cartServices";
import { LoadingContext } from "@/context/loadingContext";
import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  increaseCartCount,
  decreaseCartCount,
} from "@/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const AdminCard = ({ product }) => {
  const { getFilePreview } = useFiles();
  const { addToWishlist } = useWishlist();
  const { addToCart, deleteCart } = useCart();
  const [qty, setQty] = useState(0);
  const router = useRouter();
  const userId = useSelector((state) => state.logInUserReducer.user.id);
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    // if (cartData.length > 0) {
    //   console.log("cartData", cartData[0].Qty);
    //   setQty(cartData[0].Qty);
    // }
  }, []);

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white w-72 h-30">
      <img
        className="w-full"
        src={getFilePreview(product.ProductImageUrl)}
        alt={product.ProductName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex">{product.ProductName}</div>
        <p className="text-gray-700 text-base">{product.ProductDescription}</p>
        <span>
          <strong>Size :</strong> {product.ProductSize}
        </span>
        <div>
          <strong>Price:</strong> {product.ProductPrice} Rs
        </div>
        <div>
          <strong>Manufacturer : </strong>
          {product.manufacturerDetails.ManufacturerName}
        </div>
        <div>
          <strong>Manufacturer Country : </strong>
          {product.manufacturerDetails.ManuCountry}
        </div>
        <div>
          <strong>Manufacturer City : </strong>
          {product.manufacturerDetails.ManuCity}
        </div>
        <div>
          <strong>Manufacturing Grade : </strong>
          {product.manufacturerDetails.ManuGrade}
        </div>

        <div className="py-3">
            <button
              className="py-1 px-2 me-6 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200"        
           onClick={()=>router.push(`/update-product/${product.$id}`)}
           >
             Update
            </button>
      
            <button
              className="py-1 px-2 me-6 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
             
            >
              Delete
            </button>
       
        </div>

      </div>
    </div>
  );
};

export default AdminCard;
