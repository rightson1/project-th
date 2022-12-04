import Tomato from "../../../models/Tomato";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();

    const { method } = req;
    if (method === "GET") {
        const { search } = req.query;
        const { id } = req.query;
        try {
            if (search) {
                const tomatoes = await Tomato.find({
                    $or: [
                        { causes: { $regex: search, $options: "i" } },
                        { diseases: { $regex: search, $options: "i" } },
                        { causes: search },
                        { causes: search.toLowerCase() },
                        { causes: search.toUpperCase() },
                        { causes: search.charAt(0).toUpperCase() + search.slice(1) },
                        { diseases: search },
                        { diseases: search.toLowerCase() },
                        { diseases: search.toUpperCase() },
                    ],
                });
                res.status(200).json(tomatoes);
            } else if (id) {
                const tomatoes = await Tomato.findOne({ _id: id });
                res.status(200).json(tomatoes);
            } else {
                const toma = await Tomato.find();

                function removeDuplicates(arr) {
                    return arr.filter((item, index) => arr.indexOf(item) === index);
                }
                const uniqueIds = [];

                const unique = toma.filter((element) => {
                    const isDuplicate = uniqueIds.includes(element.diseases);

                    if (!isDuplicate) {
                        uniqueIds.push(element);

                        return true;
                    }

                    return false;
                });

                res.status(200).json(toma);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "POST") {
        try {
            console.log(req.body);
            const tomato = await Tomato.create(req.body);

            res.status(201).json(tomato);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    } else if (method === "PUT") {
        try {
            const tomato = await Tomato.findOneAndUpdate({ _id: req.query.id },
                req.body, {
                    new: true,
                }
            );
            res.status(200).json(tomato);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "DELETE") {
        try {
            const tomato = await Tomato.findOneAndDelete({ _id: req.query.id });
            res.status(200).json(tomato);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}