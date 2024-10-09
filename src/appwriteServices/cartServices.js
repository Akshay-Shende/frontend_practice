import { databases, ID } from "@/app/appWrite";
import conf from "@/app/configue/configue";
import { Query } from "appwrite";
import useProducts from "@/appwriteServices/productService";
import useManufacturer from "@/appwriteServices/ManufacturerService";
const useCart = () => {
  const{getProduct} = useProducts();
  const {getManufacturer} = useManufacturer();
  const getCart = async () => {
    try {
      var cartResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId
      );
      return cartResult;
    } catch (error) {
      console.log("Appwrite service :: getCartResult :: error", error);
      return false;
    }
  };

  const addToCart = async (cart) => {
    try {
      let cartResult = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId,
        ID.unique(),
        cart
      );
      return cartResult;
    } catch (error) {
      console.log("Appwrite service :: addToCart :: error", error);
      return false;
    }
  };
  const updateCart = async (cartId, cart) => {
    try {
      const cartResult = await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId,
        cartId,
        cart
      );
      return cartResult;
    } catch (error) {
      console.log("Appwrite service :: updateCart :: error", error);
      return false;
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const cartResult = await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId,
        cartId
      );
      return cartResult;
    } catch (error) {
      console.log("Appwrite service :: deleteCart :: error", error);
      return false;
    }
  };

  const getCartAndProductByUserId = async (userId) => {
    try {
      const cartResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId,
        [Query.equal("UserId", userId)]
      );

      console.log(cartResult.documents);
      const cartWithProductDetails = await Promise.all(
        cartResult.documents.map(async (cartItem) => {
          console.log(cartItem.ProductId);
          const productDetails = await getProduct(cartItem.ProductId);
          return {
            ...cartItem,
            productDetails,
          };
        })
      );

      return cartWithProductDetails;
    } catch (error) {
      console.log("Appwrite service :: getCartByUserId :: error", error);
      return false;
    }  
  };

  const getCartAndProductByUser = async (userId) => {
    try {
      const cartResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId,
        [Query.equal("UserId", userId)]
      );

      const cartWithProductDetails = await Promise.all(
        cartResult.documents.map(async (cartItem) => {
          const productDetails = await getProduct(cartItem.ProductId);
          productDetails.documents.map(async (product) => {
          const manufacturer = await getManufacturer(product.ManuId);
          console.log(manufacturer);
          
          ;
          return {
            ...cartItem,
            productDetails,
            manufacturer
          };
        })})
      );

      return cartWithProductDetails;
    } catch (error) {
      console.log("Appwrite service :: getCartByUserId :: error", error);
      return false;
    }  
  };

  return {
    getCart,
    addToCart,
    updateCart,
    deleteCart,
    getCartAndProductByUserId,
    getCartAndProductByUser,
  };
};
export default useCart;
