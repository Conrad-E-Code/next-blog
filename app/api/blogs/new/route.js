import { connectToDB } from "/utils/db";
import ConXBlog from "/models/ConXBlog";
// import bcrypt, {hash} from "bcrypt";

export const POST = async (req) => {
    const {contentJSON, title} = await req.json();
    try{
        await connectToDB();
        const blog = await ConXBlog.findOne({title});
        if (!blog) {
            console.log("Creating...");
            console.log(contentJSON, title)
            const newBlog = new ConXBlog({
                contentJSON,
                title
            });
            console.log("newBLog:", newBlog)
            await newBlog.save();
            return new Response(JSON.stringify(newBlog), { status: 201 });
        }
        return new Response(JSON.stringify({ error: "Title Taken" }), {
            status: 409,
        });
    } catch (error) {
        console.log(error, "POST ERROR /api/blogs/new")
    }

}