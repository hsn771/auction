import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/auction/public/api",
  headers: {
    "Content-type": "application/json"
  }
});