import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/auction_api/public/api",
  headers: {
    "Content-type": "application/json"
  }
});