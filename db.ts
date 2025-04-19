import { MongoClient, Db, Collection } from "mongodb";
//same as lab
const MONGO_URI = process.env.MONGO_URI as string
if (! MONGO_URI){
    throw new Error("MONGO_URI environment variable is undefined");
}
const DB_NAME = "url-shortener-mp5"
export const URLS_COLLECTION = "url-collection" 

let client: MongoClient | null = null
let db: Db | null = null

async function connect(): Promise<Db> {
    try {
      client = new MongoClient(process.env.MONGO_URI as string);
      await client.connect();
      console.log("Mongo connected");
    } catch (err) {
      console.error("Mongo not connected-error:", err);
      throw err;
    }
    return client.db(DB_NAME);
  }
  

export default async function getCollection(
    collectionName: string,
): Promise<Collection>{
    if(!db){
        db=await connect()
    }
    return db.collection(collectionName)
}




