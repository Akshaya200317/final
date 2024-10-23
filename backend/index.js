import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let ClothStoreProductCollection;
let ClothStoreCartCollection;

const main = async () => {
    await client.connect()
        .then(() => console.log("Connected with MongoDB for ClothStore"))
        .catch(err => console.log(err));

    ClothStoreProductCollection = client.db("clothstoredatabase").collection("products");
    ClothStoreCartCollection = client.db("clothstoredatabase").collection("carts");
};

app.get("/products", async (req, res) => {
    const products = await ClothStoreProductCollection.find().toArray();
    res.status(200).json(products);
});

app.post("/products", async (req, res) => {
    const newProduct = req.body;
    const result = await ClothStoreProductCollection.insertOne(newProduct);
    res.status(200).json(result);
});

app.get("/cart", async (req, res) => {
    const cartItems = await ClothStoreCartCollection.find().toArray();
    res.status(200).json(cartItems);
});

app.post("/cart", async (req, res) => {
    const cartItem = req.body;
    const result = await ClothStoreCartCollection.insertOne(cartItem);
    res.status(201).json(result);
});

app.put("/cart/:id", async (req, res) => {
    const { id } = req.params;
    const updatedCartItem = req.body;
    const result = await ClothStoreCartCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedCartItem }
    );
    res.status(200).json(result);
});

app.delete("/cart/:id", async (req, res) => {
    const { id } = req.params;
    const result = await ClothStoreCartCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
});


app.delete("/cart", async (req, res) => {
    const result = await ClothStoreCartCollection.deleteMany({});
    res.status(200).json(result);
});

const startServer = async () => {
    await main();
    app.listen(process.env.PORT, () => {
        console.log(`ClothStore backend is listening on port ${process.env.PORT}`);
    });
};

startServer();
