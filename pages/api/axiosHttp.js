import axios from "axios";

export default axios.create({
    baseURL: "https://5f9a49dc9d94640016f70880.mockapi.io/",
    headers: {
        "Content-type": "application/json"
    }
});