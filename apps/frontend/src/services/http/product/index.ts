import { IProduct } from "../../../@types/IProduct";
import { productAPI } from "../../api";

async function fetchProducts(): Promise<IProduct[] | null> {
  try {
    const url = `/products`;
    const { data: response } = await productAPI.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function fetchProductById(productId: string): Promise<IProduct | null> {
  try {
    const url = `/products/${productId}`;
    const { data: response } = await productAPI.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

export const productService = {
  fetchProducts,
  fetchProductById,
};
