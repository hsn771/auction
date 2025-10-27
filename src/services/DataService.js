import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }
   register(data) {
    return http.post("/register", data);
  }
  CategoryList() {
    return http.get(`/categories`);
  }
  // SingleUnit(id) {
  //   return http.get(`/units/${id}`);
  // }
  getCategories() {
    return http.get("/categories");
  }

  getCategory(id) {
    return http.get(`/categories/${id}`);
  }

  addCategory(data) {
    return http.post("/categories", data);
  }

  updateCategory(id, data) {
    return http.put(`/categories/${id}`, data);
  }

  deleteCategory(id) {
    return http.delete(`/categories/${id}`);
  }
}

export default new DataService();