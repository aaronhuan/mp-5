'use server';
import getshortenedURL from "./getshortenURL";
import getCollection from "@/db";
import { URLS_COLLECTION } from "@/db"; 
import { url } from "@/type";

export default async  function shortenURL(input_URL: string, alias:string ): Promise<void>{ //not returning anything
  const addedEntry : url = {input_URL, alias};

  const exist = await getshortenedURL(alias);
  if (exist){
    throw new Error(alias + " already exists")
  }
  const collection = await getCollection(URLS_COLLECTION);
  const result = await collection.insertOne(addedEntry);
  if (!result.acknowledged){
    throw new Error("Failed to create shortened URL")
  }
}