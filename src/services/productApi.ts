import axios from "axios";

// const url = import.meta.env.VITE_API_URL;
const url = "https://dummyjson.com/products";
// const prefix = "GetEmployee";
const productApi = {
    getProducts: async () => {
        try {
            const response = await axios.get(`${url}`);
            return response;
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error;
        }
    },
};

export default productApi;
