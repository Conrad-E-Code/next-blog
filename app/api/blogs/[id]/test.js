import { connectToDB } from "@/utils/db"
import ConXBlog from "@/models/ConXBlog";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/app/api/auth/options";

export const DELETE = async (req, { params }) => {
    const session = await getServerSession(NextAuthOptions)
    if (!session) {
        return new Response(JSON.stringify({error: "unauthorized"}), {status: 401})
    }
  try {

    // console.log(params, "%%%%%%%%%%%%%%%%%%PARAMS%%%%%%%%%%%%%%%%%%%%%");
    await connectToDB();
    const deleteBlog = await ConXBlog.findById(params.id);

    if (deleteBlog["author"] === session.user._id)  {
    deleteBlog.remove()

    // console.log(deleteBlog, "DELETE BLOG");
    return new Response(JSON.stringify(deleteBlog), { status: 200,

       });}
  } catch (error) {
    console.log(error, "MY ERROR");
  }
};

export const PATCH = async (req, { params }) => {
      const { title, contentJSON} =
    await req.json();
    const session = await getServerSession(NextAuthOptions)
//   console.log(params, "id from PARAMASSSSSSSSSSSS");
if (!session) {
    return new Response(JSON.stringify({error: "unauthorized"}), {status: 401})
}
  try {
    await connectToDB();
    const targetBlog = await ConXBlog.findById(params.id)
    if (targetBlog["author"] === session.user._id) {
    const updateBlog = await ConXBlog.findByIdAndUpdate(params.id, {
        title,
        contentJSON
    });
    return new Response(JSON.stringify(updateBlog), { status: 202 });
} else {
    return new Response(JSON.stringify({error: "unauthorized"}),{status: 401})
}
  } catch (error) {
    console.log(error, "MY ERROR");
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
