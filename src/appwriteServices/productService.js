import conf from "@/app/configue/configue";
import { databases ,ID } from "@/app/appWrite";
import useManufacturer from "./ManufacturerService";
const useProducts = () => {
  const { getManufacturer } = useManufacturer();
  const productCollectionId = conf.appwriteProductCollectionId;

  const getProducts = async () => {
    try {
      const productResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        productCollectionId
      );
      return productResult;
    } catch (error) {
      console.log("Appwrite service :: getProducts :: error", error);
      return false;
    }
  };
  const createProduct = async (product) => {
    try {
      const productResult = await databases.createDocument(
        conf.appwriteDatabaseId,
        productCollectionId,
        ID.unique(),
        product
      );
      return productResult;
    } catch (error) {
      console.log("Appwrite service :: createProduct :: error", error);
      return false;
    }
  };

  const updateProduct = async (productId, product) => {
    try {
      const productResult = await databases.updateDocument(
        conf.appwriteDatabaseId,
        productCollectionId,
        productId,
        product
      );
      return productResult;
    } catch (error) {
      console.log("Appwrite service :: updateProduct :: error", error);
      return false;
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const productResult = await databases.deleteDocument(
        conf.appwriteDatabaseId,
        productCollectionId,
        productId
      );
      return productResult;
    } catch (error) {
      console.log("Appwrite service :: deleteProduct :: error", error);
      return false;
    }
  };

  const getProduct = async (productId) => {
    try {   
      const productResult = await databases.getDocument(
        conf.appwriteDatabaseId,
        productCollectionId,
        productId
      );
      return productResult;
    } catch (error) {
      console.log("Appwrite service :: getProduct :: error", error);
      return false;
    }
  };

  const getProductIncludeManufacturer = async () => {
    try {
      const productResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId
      );
      const getProductResultWithManufacturer = await Promise.all(
        productResult.documents.map(async (productItem) => {
          const manufacturerDetails = await getManufacturer(productItem.ManuId);
         return {
            ...productItem,
            manufacturerDetails,
          };
        })
      );

      return getProductResultWithManufacturer;
    } catch (error) {
      console.log("Appwrite service :: getCartByUserId :: error", error);
      return false;
    }  
  };
  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductIncludeManufacturer,
  };
};
export default useProducts;
