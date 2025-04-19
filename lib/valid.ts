"use server";


export default async function valid(urlinput:string): Promise<boolean>{
    try {
        //https://nodejs.org/api/url.html
        new URL(urlinput); //check validity of URL, type error will throw if its not valid
        return true;
    } catch(e) {
        console.log(e); 
        return false;
    }
}