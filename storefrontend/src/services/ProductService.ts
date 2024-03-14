import axios from "axios";

export default class ProductService {
  static async getProducts() {
    return await axios.get("http://localhost:8080/api/v1/products/getAll");
  }

  static async getProductByCategoryId(categoryId: number) {
    return await axios.get(
      `http://localhost:8080/api/v1/products/getByCategoryId?categoryId= ${categoryId}`);
  }
}
