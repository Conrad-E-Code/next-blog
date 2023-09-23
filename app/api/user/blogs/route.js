import { connectToDB } from "/utils/db";
import ConXBlog from "/models/ConXBlog";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/app/api/auth/options";


//ROUTE HANDLER
export const GET = async (req) => {
    const session = await getServerSession(NextAuthOptions)
    if (!session) {
        return new Response(JSON.stringify({error: "unauthorized"}), {status: 401})
    }
        try {
            // const myReq = await req.json()
            // console.log("myReq", myReq)
            await connectToDB();
            const blogs = await ConXBlog.find({author: session.user._id});
            return new Response(JSON.stringify(blogs), {
                status: 200,
            });
    } catch (error) {
        return new Response(JSON.stringify({"error": error}), {status: 500})
    }
    

};
