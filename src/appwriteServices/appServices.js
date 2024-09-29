import { databases, account } from "../app/appWrite";
import conf from "../app/configue/configue";
import { Client, Users } from 'node-appwrite';
const client    = new Client()
                .setEndpoint(conf.appwriteUrl) 
                .setProject(conf.appwriteProjectId)
                .setKey(conf.appwriteAPIKey)               
          
const users     = new Users(client);

const getBooks = async () => {
    try {
        console.log(users);
        
        var resultUser =  await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId
        );

        console.log(resultUser);
        return resultUser;

    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
};

const getUsers = async () => {
    try {
        console.log(users);
        
        var resultUser =  await users.list();
        console.log(resultUser);
        return resultUser;

    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
};


export { getBooks, getUsers };
