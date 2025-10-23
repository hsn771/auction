import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }
   register(data) {
    return http.post("/register", data);
  }
  BatchEnroll(uid) {
    return http.get(`/batchEnroll?student_id=${uid}`);
  }
  batcheDetail(bid) {
    return http.get(`/course_details/${bid}`);
  }
}

export default new DataService();