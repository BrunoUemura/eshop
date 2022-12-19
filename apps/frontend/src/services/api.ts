import axios from "axios";

const productURL = "http://localhost:5001/api";
const orderURL = "http://localhost:5002/api";
const paymentURL = "http://localhost:5003/api";

export const productAPI = axios.create({ baseURL: productURL });
export const orderAPI = axios.create({ baseURL: orderURL });
export const paymentAPI = axios.create({ baseURL: paymentURL });
