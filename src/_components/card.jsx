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
import { increaseCartCount, decreaseCartCount } from "@/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner'

const Card = ({ product, cartData }) => {
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

  const addToWishlistFunction = () => {
    console.log("wishlist");

    const wishlist = {
      UserId: userId,
      ProductId: product.$id,
      AddedOn: Date.now(),
    };
    try {
      const resultData = addToWishlist(wishlist);
      return resultData;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartFunction = async () => {
    if(userId == 0){
      router.push("/login");
      return;
    }

    const cart = {
      ProductId: product.$id,
      UserId: userId,
      Qty: qty,
      AddedOn: new Date().toISOString(),
    };

    setLoading(true);
    const cartResult = await addToCart(cart);

    if(cartResult != false) {
      toast.success("Product Added to Cart");
    }

    dispatch(increaseCartCount())
    setLoading(false);
  };

  const removeFromCart = async () => {
    if(cartData.length > 0) {
      setLoading(true);
      const cartResult = await  deleteCart(cartData[0].$id);
      dispatch(decreaseCartCount())
      setLoading(false);
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white w-64 h-30">
      <img
        className="w-full"
        src={getFilePreview(product.ProductImageUrl)}
        alt={product.ProductName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex">
          {product.ProductName}

          <button className="ms-36">
            <FaRegHeart
              style={{ marginTop: "5px", color: "red", fontSize: "24px" }}
            />
          </button>
        </div>
        <p className="text-gray-700 text-base">{product.ProductDescription}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex justify-between py-3 px-4">
          <button onClick={() => setQty((prev) => prev + 1)}>
            <FaPlus />
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty((prev) => (prev > 0 ? prev - 1 : 0))}>
            <FaMinus />
          </button>
        </div>
        <div>  <strong>Size:</strong> {product.ProductSize}</div>
        <div className="mb-2">  <strong>Price:</strong> {product.ProductPrice} Rs</div>

        <div className="pb-2">
          {(cartData == undefined || !cartData.length > 0 ) ? (
            <button
              className={`py-1 px-2 me-6  ${
                qty == 0 ? "cursor-not-allowed bg-gray-200 rounded": "bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              }`}
              onClick={addToCartFunction }
              disabled={qty == 0}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="py-1 px-2 me-6 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              onClick={removeFromCart}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
