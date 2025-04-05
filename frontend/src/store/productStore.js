import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/v1/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/v1/products");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/v1/product/${pid}`, {
            method: "DELETE",
        });
        console.log(res);

        if (res.status === 404)
            return { success: false, message: "product not found" };

        // update the ui immediately, without needing a refresh
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: "product successfully deleted" };
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/v1/product/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.status) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));

        return { success: true, message: data.message };
    },
}));
