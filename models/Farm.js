import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const FarmSchema = new Schema({
    location: str,
    name: str,
    size: str,
    image: {
        type: String,
        default: "",
    },
    pic: {
        type: String,
        default: "",
    },
    crops: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Farm || model("Farm", FarmSchema);