import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const MessageSchema = new Schema({
    text: str,
    name: str,
    url: {
        type: String,
        default: "",
    },
    read: {
        type: Boolean,
        default: false,
    },
    workerId: str,
}, { timestamps: true });

export default models.Message || model("Message", MessageSchema);