import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    name: {
        type: String,
        required: [true, "Missing Name!"]
    },
    email: {
        type: String,
        required: [true, "Missing email!"]
    }
});

const User = models.User || model("User", UserSchema);

export default User;