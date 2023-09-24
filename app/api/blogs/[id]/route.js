import { connectToDB } from "@/utils/db"
import ConXBlog from "@/models/ConXBlog";

export const DELETE = async (req, { params }) => {
  try {

    // console.log(params, "%%%%%%%%%%%%%%%%%%PARAMS%%%%%%%%%%%%%%%%%%%%%");
    await connectToDB();
    const deleteBlog = await ConXBlog.findByIdAndDelete(params.id);
    // console.log(deleteBlog, "DELETE BLOG");
    return new Response(JSON.stringify(deleteBlog), { status: 200,

       });
  } catch (error) {
    console.log(error, "MY ERROR");
  }
};

export const PATCH = async (req, { params }) => {
//   console.log(params, "id from PARAMASSSSSSSSSSSS");
  const { title, contentJSON} =
    await req.json();
  try {
    await connectToDB();
    const updateBlog = await ConXBlog.findByIdAndUpdate(params.id, {
        title,
        contentJSON
    });
    return new Response(JSON.stringify(updateBlog), { status: 202 });
  } catch (error) {
    console.log(error, "MY ERROR");
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
