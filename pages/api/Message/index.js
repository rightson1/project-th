import Message from "../../../models/Message";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    const { method } = req;
    if (req.method === "POST") {
        try {
            const message = await Message.create(req.body);
            res.status(201).json({ message });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        const { read } = req.query;
        if (read) {
            try {
                const message = await Message.find({ read: false });
                res.status(200).json({ messages: message.length });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else if (id) {
            const message = await Message.findById(id);
            res.status(200).json(message);
        } else {
            try {
                const messages = await Message.find({}).sort({ read: false });
                res.status(200).json(messages);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } else if (req.method === "PUT") {
        const { id } = req.query;
        try {
            const message = await Message.findByIdAndUpdate(
                id, { read: true }, { new: true }
            );
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "DELETE") {
        try {
            const message = await Message.findByIdAndDelete(req.query.id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json("Wrong route");
    }
}