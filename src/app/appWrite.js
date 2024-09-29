import { Client, Account, Databases,ID } from 'appwrite';
import conf from './configue/configue';

// Initialize Appwrite client
const client    = new Client()
                .setEndpoint(conf.appwriteUrl) 
                .setProject(conf.appwriteProjectId);               
          
const account   = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
