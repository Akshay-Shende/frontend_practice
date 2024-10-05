import { databases, ID } from "@/app/appWrite";
import conf from "@/app/configue/configue";

const useWishlist = () => {


  const getWishlist = async () => {
    try {
    var wishlistResult =  await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritewishlistCollectionId
      );
      return wishlistResult;

    } catch (error) {
      console.log("Appwrite service :: getWishlist :: error", error);
      return false;
    }
  };

  const addToWishlist = async (wishlist) =>{
    let wishlistResult = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwritewishlistCollectionId,
      ID.unique(),
      wishlist
    );
    return wishlistResult;
  }

  const updateWishlist = async (wishlistId, wishlist) => {
    try {
      const wishlistResult = await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritewishlistCollectionId,
        wishlistId,
        wishlist
      );
      return wishlistResult;
    } catch (error) {
      console.log("Appwrite service :: updateWishlist :: error", error);
      return false;
    }
  };
  const deleteWishlist = async (wishlistId) => {
    try {
      const wishlistResult = await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritewishlistCollectionId,
        wishlistId
      );
      return wishlistResult;
    } catch (error) {
      console.log("Appwrite service :: deleteWishlist :: error", error);
      return false;
    }
  };


  return {
    getWishlist,
    addToWishlist,
    updateWishlist,
    deleteWishlist,
  };
};
export default useWishlist;
