import Pedi from "../../../models/Admin";
import db from "../../../models/db";

export default async function handler(req, res) {
    const { method } = req;

    await db();
    if (method === "POST") {
        try {
            let name = await Pedi.find();
            name = `pedi-N${name.length + 1}R${Math.floor(Math.random() * 10)}`;
            req.body.name = name;

            const pedi = await Pedi.create(req.body);
            res.status(201).json(pedi);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "GET") {
        const email = req.query.email;

        if (email) {
            try {
                const pedi = await Pedi.findOne({ email: email });
                res.status(200).json(pedi);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            try {
                const pedi = await Pedi.find({});
                res.status(200).json(pedi);
            } catch (error) {
                res.status(400).json({ success: false });
            }
        }
    } else {
        res.status(400).json({ success: false });
    }
}