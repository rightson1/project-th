import Farm from "../../../models/Farm";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();

    if (req.method === "POST") {
        try {
            const farms = await Farm.find({});
            const name = `CF${farms.length}`;
            req.body.name = name;

            const farm = await Farm.create(req.body);
            res.status(201).json({ farm });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        if (id) {
            const farm = await Farm.findById(id);
            res.status(200).json(farm);
        } else {
            try {
                const farms = await Farm.find({}).sort({ createdAt: -1 });
                res.status(200).json(farms);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } else if (req.method === "DELETE") {
        try {
            const farm = await Farm.findByIdAndDelete(req.query.id);
            res.status(200).json({ farm });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json("Wrong route");
    }
}