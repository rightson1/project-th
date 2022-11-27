import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const AdminSchema = new Schema({
    username: str,
    password: str,
    email: str,
    codes: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Admin || model("Admin", AdminSchema);