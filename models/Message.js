import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const MessageSchema = new Schema({
    text: str,
    sender: str,
    url: {
        type: String,
        default: "",
    },
    profile: {
        type: String,
        default: "",
    },
    read: {
        type: Boolean,
        default: false,
    },
    senderId: str,
    receiverId: {
        type: String,
        default: "",
    },
    admin: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default models.Message || model("Message", MessageSchema);