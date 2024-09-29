import { databases } from "@/app/appWrite";
import conf from "@/app/configue/configue";

const useRoles = () => {
  const roleCollectionId = conf.appwriteRoleCollectionId;

  const getRoles = async () => {
    try {
    var roleResult =  await databases.listDocuments(
        conf.appwriteDatabaseId,
        roleCollectionId
      );
      return roleResult;

    } catch (error) {
      console.log("Appwrite service :: getRoles :: error", error);
      return false;
    }
  };

  return {
    getRoles
  };
};
export default useRoles;
