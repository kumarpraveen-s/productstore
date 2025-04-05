import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ status: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ status: true, data: newProduct });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ status: false, message: "Id is invalid" });
    }

    const product = req.body;
    try {
        const updatedproduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(200).json({ status: true, data: updatedproduct });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).json({ status: true, message: "product deleted" });
    } catch (error) {
        res.status(404).json({ status: false, message: "Product not found" });
    }
};
