//Blogs get route
import { connectToDB } from "/utils/db";
import ConXBlog from "/models/ConXBlog";

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
    try {
            await connectToDB();
            const blogs = await ConXBlog.find({});
            return new Response(JSON.stringify(blogs), {
                status: 200,
            });
    } catch (error) {
        console.log(error, "GET error pjms route");
    }
};
