const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    appwriteAPIKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
    appwriteRoleCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ROLE_COLLECTION_ID),
    appwriteProductCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID),
    appwriteManufacturerCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_MANUFACTURER_COLLECTION_ID),
    appwriteProductBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_BUCKET_ID),
}
export default conf;    