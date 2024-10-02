import conf from "@/app/configue/configue";
import { storage, ID } from "@/app/appWrite";
import { Storage } from "appwrite";

const useFiles = () => {
  const bucketId = conf.appwriteProductBucketId;

  const createFile = async (file) => {
    try {
      const fileResult = await storage.createFile(bucketId, ID.unique(), file);
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: createFile :: error", error);
      return false;
    }
  };

  const deleteFile = async (fileId) => {
    try {
      const fileResult = await storage.deleteFile(bucketId, fileId);
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  };

  const updateFile = async (fileId, file) => {
    try {
      const fileResult = await storage.updateFile(bucketId, fileId, file);
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: updateFile :: error", error);
      return false;
    }
  };

  const getFile = async (fileId) => {
    try {
      const fileResult = await storage.getFile(bucketId, fileId);
    
      
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: getFile :: error", error);
      return false;
    }
  };

  const getFilePreview = (fileId) => {
    try {
      const fileResult = storage.getFilePreview(bucketId, fileId).href;
      console.log( "fileResult",fileResult);
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
      return false;
    }
  };

  const getFileView = (fileId) => {
   try {
      const fileResult = storage.getFileView(bucketId, fileId).href;
      console.log( "fileResult",fileResult);
      return fileResult;
    } catch (error) {
      console.log("Appwrite service :: getFileView :: error", error);
      return false;
    }
  };

  return { createFile, deleteFile, updateFile, getFile, getFilePreview,getFileView };
};

export default useFiles;
