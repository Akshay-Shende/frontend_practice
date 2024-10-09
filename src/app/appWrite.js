import { Client, Account, Databases,ID, Storage } from 'appwrite';
import {Users} from 'node-appwrite';
import conf from './configue/configue';


// Initialize Appwrite client
const client    = new Client()
                .setEndpoint(conf.appwriteUrl) 
                .setProject(conf.appwriteProjectId);               
          
const account   = new Account(client);
const databases = new Databases(client);
const storage   = new Storage(client);
const user      = new Users(client);

export { client, account, databases, ID, storage, user };
