import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.route("/products").get(getProducts).post(createProduct);

router
    .route("/product/:id")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;
