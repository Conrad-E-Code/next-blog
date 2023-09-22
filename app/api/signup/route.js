import { connectToDB } from "/utils/db";
import User from "/models/User";
import bcrypt, {hash} from "bcrypt";
export const POST = async (req) => {
    const { password, name, email } = await req.json();
    try{
        // console.log(username, password, "MY TRY")
        await connectToDB();
        const user = await User.findOne({ name });
        const emailCheck = await User.findOne({email})
        if (!user && !emailCheck ) {  // upgrade error handling here this could be either email or username double
            console.log("NO USER FOUND...CREATING");
              const pHash = await bcrypt.hash(password, 10);
            const newUser = new User({
              password: pHash,
              name,
              email
            });
              await newUser.save();
              return new Response(JSON.stringify({message: "Success"}), { status: 201 });
          }
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 409,
            });
    } catch (error) {
        console.log(error, "MY ERROR")
    }
};
