import Uploads from "../../../models/Uploads";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const upload = await Uploads.create(req.body);
            res.status(201).json({ upload });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        const { read } = req.query;
        if (read) {
            try {
                const upload = await Uploads.find({ read: false });
                res.status(200).json({ uploads: upload.length });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else if (id) {
            const upload = await Uploads.findById(id);
            res.status(200).json(upload);
        } else {
            try {
                const uploads = await Uploads.find({}).sort({ read: false });
                res.status(200).json(uploads);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } else if (req.method === "PUT") {
        const { id } = req.query;
        try {
            const upload = await Uploads.findByIdAndUpdate(
                id, { read: true }, { new: true }
            );
            res.status(200).json(upload);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "DELETE") {
        try {
            const upload = await Uploads.findByIdAndDelete(req.query.id);
            res.status(200).json({ upload });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json("Wrong route");
    }
}