"use server";
import getCollection from "@/db";
import { URLS_COLLECTION } from "@/db";
import { url } from "@/type";

export default async function getshortenedURL(alias: string): Promise<url|null>{
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne<url>({alias})
    return result;
}