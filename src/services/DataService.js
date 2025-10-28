import http from "../http-common";

class DataService {
  // 🔹 Authentication
  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }

  // 🔹 Category APIs
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

  // 🔹 Auction APIs
  getAuctions() {
    return http.get("/auctions");
  }

  getAuction(id) {
    return http.get(`/auctions/${id}`);
  }

  addAuction(data) {
    return http.post("/auctions", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  updateAuction(id, data) {
    // Using POST with _method=PUT for file uploads (Laravel convention)
    return http.post(`/auctions/${id}?_method=PUT`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  deleteAuction(id) {
    return http.delete(`/auctions/${id}`);
  }
}

export default new DataService();
