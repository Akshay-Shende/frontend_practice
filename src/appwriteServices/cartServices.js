import { databases, ID } from "@/app/appWrite";
import conf from "@/app/configue/configue";

const useCart = () => {


  const getCart = async () => {
    try {
    var cartResult =  await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecartCollectionId
      );
      return cartResult;

    } catch (error) {
      console.log("Appwrite service :: getCartResult :: error", error);
      return false;
    }
  };

  const addToCart = async (cart) =>{
    try{
    let cartResult = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwritecartCollectionId,
      ID.unique(),
      cart
    );
    return cartResult;
  }catch(error){
    console.log("Appwrite service :: addToCart :: error", error);
    return false;
  }
  }
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


 

  return {
    getCart,
    addToCart,
    updateCart,
    deleteCart,
  };
};
export default useCart;
