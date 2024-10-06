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

  const getManufacturer = async (id) => {
    try {
      const manufacturerResult = await databases.getDocument(
        conf.appwriteDatabaseId,
        manufacturerCollectionId,
        id
      );
      return manufacturerResult;
    } catch (error) {
      console.log("Appwrite service :: getManufacturer :: error", error);
      return false;
    }
  };
  const addManufacturer = async (manufacturer) => {
    try {
      const manufacturerResult = await databases.createDocument(
        conf.appwriteDatabaseId,
        manufacturerCollectionId,
        "unique()",
        manufacturer
      );
      return manufacturerResult;
    } catch (error) {
      console.log("Appwrite service :: addManufacturer :: error", error);
      return false;
    }
  };
  const updateManufacturer = async (id, manufacturer) => {
    try {
      const manufacturerResult = await databases.updateDocument(
        conf.appwriteDatabaseId,
        manufacturerCollectionId,
        id,
        manufacturer
      );
      return manufacturerResult;
    } catch (error) {
      console.log("Appwrite service :: updateManufacturer :: error", error);
      return false;
    }
  };

  const deleteManufacturer = async (id) => {
    try {
      const manufacturerResult = await databases.deleteDocument(
        conf.appwriteDatabaseId,
        manufacturerCollectionId,
        id
      );
      return manufacturerResult;
    } catch (error) {
      console.log("Appwrite service :: deleteManufacturer :: error", error);
      return false;
    }
  };

  return {
    getManufacturers,
    getManufacturer,
    addManufacturer,
    updateManufacturer,
    deleteManufacturer,
  };
};
export default useManufacturer;
