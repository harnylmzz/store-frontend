import axios from "axios";

export default class CategoryService {
  static async getCategories() {
    return await axios.get("http://localhost:8080/api/v1/categories/getall");
  }
}
