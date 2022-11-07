import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const WokerSchema = new Schema({
    username: str,
    password: str,
    email: str,
    avatar: {
        type: String,
        default: "",
    },
    pic: {
        type: String,
        default: "",
    },
    nationalId: {
        type: String,
        default: "",
    },
    keenName: {
        type: String,
        default: "",
    },
    keenPhone: {
        type: String,
        default: "",
    },
    residence: {
        type: String,
        default: "",
    },
    farm: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Woker || model("Woker", WokerSchema);