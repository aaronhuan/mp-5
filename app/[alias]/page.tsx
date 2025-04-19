import { redirect } from "next/navigation";
import getshortenedURL from "@/lib/getshortenURL";

export default async function redirectedP({ params }: { params: Promise<{ alias: string }> }){
  const {alias} = await params;
  const data = await getshortenedURL(alias);
  if (!data) { 
    redirect("/")
  }
  redirect(data.input_URL); 
  return(
    <p>loading...</p>
  );
}
