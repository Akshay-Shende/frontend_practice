import conf from "@/app/configue/configue";
import { databases } from "@/app/appWrite";
const useManufacturer = () => {
  const manufacturerCollectionId = conf.appwriteManufacturerCollectionId;

  const getManufacturers = async () => {
    try {
      const manufacturerResult = await databases.listDocuments(
        conf.appwriteDatabaseId,
        manufacturerCollectionId
      );
      return manufacturerResult;
    } catch (error) {
      console.log("Appwrite service :: getManufacturers :: error", error);
      return false;
    }
  };

  return { getManufacturers };
};
export default useManufacturer;
