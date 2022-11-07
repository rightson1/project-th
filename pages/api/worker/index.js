import Worker from "../../../models/Worker";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    const { method } = req;
    if (method === "GET") {
        const { email } = req.query;
        const { id } = req.query;

        try {
            if (email) {
                const worker = await Worker.findOne({ email });
                res.status(200).json(worker);
            } else if (id) {
                const worker = await Worker.findOne({ _id: id });
                res.status(200).json(worker);
            } else {
                const workers = await Worker.find({}).sort({ createdAt: -1 });
                res.status(200).json(workers);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "POST") {
        try {
            const worker = await Worker.create(req.body);
            res.status(201).json({ success: true, data: worker });
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const worker = await Worker.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            res.status(201).json({ success: true, data: worker });
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "DELETE") {
        const { id } = req.query;
        try {
            const worker = await Worker.findByIdAndDelete(id);
            res.status(201).json({ success: true, data: worker });
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json({ success: false });
    }
}