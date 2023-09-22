import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
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