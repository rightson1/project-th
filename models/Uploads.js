import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const UploadSchema = new Schema({
    disease: str,
    url: str,
    read: {
        type: Boolean,
        default: false,
    },
    workerId: str,
}, { timestamps: true });

export default models.Upload || model("Upload", UploadSchema);